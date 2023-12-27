import { Injectable } from '@angular/core';
import { productosEjemplo } from '../data/data';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Producto[];

  constructor() {
    // this.setStorage('productos', productosEjemplo);
    this.productos = this.findAll();
  }

  getStorage(key: string): Producto[] | undefined {
    let productosString = localStorage.getItem(key);
    if (productosString) return JSON.parse(productosString);
    return undefined;
  }

  setStorage(key: string, productos: Producto[]): void {
    localStorage.setItem(key, JSON.stringify(productos));
  }

  public findAll(): Producto[] {
    let productos = this.getStorage('productos');
    if (productos) this.productos = productos || [];
    return this.productos;
  }

  public getById(id: string) {
    return this.productos.find((producto) => producto.id == id);
  }

  public deleteById(id: string) {
    this.productos = this.productos.filter((producto) => producto.id !== id);
    this.setStorage('productos', this.productos);
    return this.productos;
  }

  create(producto: Producto): void {
    producto.id = this.idGenerator();
    this.productos.push(producto);
    this.setStorage('productos', this.productos);
  }

  update(producto: Producto) {
    const index = this.productos.findIndex((p) => p.id == producto.id);
    if (index !== -1) {
      this.productos[index] = producto;
      this.setStorage('productos', this.productos);
    } else {
      console.error(
        `Producto con ID ${producto.id} no encontrado para actualizar.`
      );
    }
  }

  idGenerator() {
    const timestampPart = new Date().getTime().toString().slice(-3);
    const randomPart = Math.random().toString(36).substring(2, 4).toUpperCase();
    return `SKU-A${timestampPart}${randomPart}`;
  }
}
