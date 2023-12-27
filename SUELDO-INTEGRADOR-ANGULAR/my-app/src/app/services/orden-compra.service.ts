import { Injectable } from '@angular/core';
import { ordenesEjemplo } from '../data/data';
import { OrdenCompra } from '../models/OrdenCompra';

@Injectable({
  providedIn: 'root',
})
export class OrdenCompraService {
  private ordenes: OrdenCompra[];

  constructor() {
    // this.setStorage('ordenes', ordenesEjemplo);
    this.ordenes = this.findAll();
  }

  getStorage(key: string): OrdenCompra[] | undefined {
    let ordenString = localStorage.getItem(key);
    if (ordenString) return JSON.parse(ordenString);
    return undefined;
  }

  setStorage(key: string, ordenes: OrdenCompra[]): void {
    localStorage.setItem(key, JSON.stringify(ordenes));
  }

  create(ordenCompra: OrdenCompra): string {
    ordenCompra.id = this.idGenerator();
    this.ordenes.push(ordenCompra);
    this.setStorage('ordenes', this.ordenes);
    return ordenCompra.id;
  }

  public findAll(): OrdenCompra[] {
    let ordenes = this.getStorage('ordenes');
    if (ordenes) this.ordenes = ordenes || [];
    return this.ordenes;
  }

  public getById(id: string): OrdenCompra | undefined {
    return this.ordenes.find((orden) => orden.id == id);
  }

  public cancelById(id: string) {
    const index = this.ordenes.findIndex((o) => o.id == id);
    if (index !== -1) {
      this.ordenes[index].isActive = !this.ordenes[index].isActive;
      this.setStorage('ordenes', this.ordenes);
    }
    return this.ordenes;
  }

  idGenerator() {
    const timestampPart = new Date().getTime().toString().slice(-3);
    const randomPart = Math.random().toString(36).substring(2, 4).toUpperCase();
    return `OC-A${timestampPart}${randomPart}`;
  }

  fechaFormateada(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }
}
