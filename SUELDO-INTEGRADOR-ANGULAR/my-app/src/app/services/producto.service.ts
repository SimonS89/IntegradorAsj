import { Injectable } from '@angular/core';
import { productosEjemplo } from '../data/data';
import { Producto } from '../models/Producto';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/Producto';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Producto[] = this.obtenerTodos() || [];

  constructor(private http: HttpClient, private router: Router) {}

  getStorage(key: string): Producto[] | undefined {
    let productosString = localStorage.getItem(key);
    if (productosString) return JSON.parse(productosString);
    return undefined;
  }

  setStorage(key: string, productos: Producto[]): void {
    localStorage.setItem(key, JSON.stringify(productos));
  }

  public obtenerTodos(): Producto[] {
    let productos = this.getStorage('productos');
    if (productos) this.productos = productos || [];
    return this.productos;
  }

  public obtenerPorId(id: number): Producto {
    return this.productos.find((producto) => producto.id == id)!;
  }

  public eliminarPorId(id: number): Producto[] {
    this.productos = this.productos.filter((producto) => producto.id !== id);
    this.setStorage('productos', this.productos);
    return this.productos;
  }

  crear(producto: Producto): void {
    this.productos.push(producto);
    this.setStorage('productos', this.productos);
  }

  actualizar(producto: Producto) {
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

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${environment.apiUrl}/admin/categorias`);
  }

  obtenerProductosPorProveedor(razonSocial: string): Producto[] {
    return this.productos;
    // ? this.productos.filter((producto) => producto.proveedor === razonSocial)
    // : [];
  }
}
