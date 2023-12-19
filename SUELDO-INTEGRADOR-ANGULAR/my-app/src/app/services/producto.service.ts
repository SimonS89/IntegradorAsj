import { Injectable } from '@angular/core';
import { productosEjemplo } from '../data/data';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: any[];

  constructor() {
    this.productos = productosEjemplo;
  }

  public getData() {
    return this.productos;
  }

  public getById(id: string) {
    return this.productos.find((producto) => producto.id == id);
  }

  public deleteById(id: string) {
    this.productos = this.productos.filter((producto) => producto.id !== id);
    return this.productos;
  }
}
