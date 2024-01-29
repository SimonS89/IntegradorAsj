import { Injectable } from '@angular/core';
import { OrdenCompra } from '../models/OrdenCompra';
import { ordenesEjemplo } from '../data/data';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrdenCompraService {
  private ordenes: OrdenCompra[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getStorage(key: string): OrdenCompra[] | undefined {
    let ordenString = localStorage.getItem(key);
    if (ordenString) return JSON.parse(ordenString);
    return undefined;
  }

  setStorage(key: string, ordenes: OrdenCompra[]): void {
    localStorage.setItem(key, JSON.stringify(ordenes));
  }

  crear(ordenCompra: OrdenCompra): Observable<OrdenCompra> {
    console.log(ordenCompra);

    return this.http
      .post<OrdenCompra>(`${environment.apiUrl}/orden`, ordenCompra)
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

  public obtenerTodos(mostrarActivas?: boolean): Observable<OrdenCompra[]> {
    return this.http
      .get<OrdenCompra[]>(
        `${environment.apiUrl}/orden${
          mostrarActivas != undefined ? `?activas=${!mostrarActivas}` : ''
        }`
      )
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          return of([]);
        })
      );
  }

  public obtenerPorId(id: number): Observable<OrdenCompra> {
    return this.http.get<OrdenCompra>(`${environment.apiUrl}/orden/${id}`).pipe(
      catchError((error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
        this.router.navigate(['/proveedores']);
        throw error;
      })
    );
  }

  public cambiarEstado(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/orden/estado/${id}`).pipe(
      catchError((error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  fechaFormateada(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }
}
