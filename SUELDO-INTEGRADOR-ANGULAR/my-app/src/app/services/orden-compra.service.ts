import { Injectable } from '@angular/core';
import { ordenesEjemplo } from '../data/data';

@Injectable({
  providedIn: 'root',
})
export class OrdenCompraService {
  private ordenes: any[];
  constructor() {
    this.ordenes = ordenesEjemplo;
  }

  public getData() {
    return this.ordenes;
  }

  public getById(id: string) {
    return this.ordenes.find((orden) => orden.id == id);
  }

  public deleteById(id: string) {
    this.ordenes = this.ordenes.filter((orden) => orden.id !== id);
    return this.ordenes;
  }
}
