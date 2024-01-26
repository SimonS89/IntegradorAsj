import { Injectable } from '@angular/core';
import { productosEjemplo } from '../data/data';
import { Producto, ProductoForm } from '../models/Producto';
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

  public obtenerPorId(id: number): Observable<ProductoForm> {
    return this.http
      .get<ProductoForm>(`${environment.apiUrl}/producto/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          this.router.navigate(['/productos']);
          throw error;
        })
      );
  }

  public eliminarPorId(id: number): Producto[] {
    this.productos = this.productos.filter((producto) => producto.id !== id);
    this.setStorage('productos', this.productos);
    return this.productos;
  }

  crear(producto: ProductoForm): Observable<Producto> {
    return this.http
      .post<Producto>(`${environment.apiUrl}/producto`, producto)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error.stat);
          if (error instanceof HttpErrorResponse) {
            console.log('Codigo ', error.status);
            console.log('Mensaje ', error.message);
          }
          throw error;
        })
      );
  }

  public actualizar(id: number, producto: ProductoForm): Observable<Producto> {
    return this.http
      .put<Producto>(`${environment.apiUrl}/producto/${id}`, producto)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
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
