import { Injectable } from '@angular/core';
import { ProveedorForm, Proveedor, Rubro, TipoIva } from '../models/Proveedor';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../models/Proveedor';
import { Provincia } from '../models/Proveedor';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient, private router: Router) {}

  public eliminarPorId(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/proveedor/${id}`).pipe(
      catchError((error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  public crear(proveedor: ProveedorForm): Observable<Proveedor> {
    return this.http
      .post<Proveedor>(`${environment.apiUrl}/proveedor`, proveedor)
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

  public actualizar(
    id: number,
    proveedor: ProveedorForm
  ): Observable<Proveedor> {
    return this.http
      .put<Proveedor>(`${environment.apiUrl}/proveedor/${id}`, proveedor)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public obtenerPorId(id: number): Observable<ProveedorForm> {
    return this.http
      .get<ProveedorForm>(`${environment.apiUrl}/proveedor/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          this.router.navigate(['/proveedores']);
          throw error;
        })
      );
  }

  public obtenerPorIdDetalle(id: number): Observable<Proveedor> {
    return this.http
      .get<Proveedor>(`${environment.apiUrl}/proveedor/${id}/detalle`)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          this.router.navigate(['/productos']);
          throw error;
        })
      );
  }

  public validarCodigoExistente(codigo: string): Observable<Proveedor> {
    return this.http
      .get<Proveedor>(
        `${environment.apiUrl}/proveedor/validar_codigo/${codigo}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error.status);
          throw error;
        })
      );
  }

  public validarCuitExistente(cuit: string): Observable<Proveedor> {
    return this.http
      .get<Proveedor>(`${environment.apiUrl}/proveedor/validar_cuit/${cuit}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error.status);
          throw error;
        })
      );
  }

  public obtenerTodos(mostrarEliminados?: boolean): Observable<Proveedor[]> {
    return this.http
      .get<Proveedor[]>(
        `${environment.apiUrl}/proveedor${
          mostrarEliminados != undefined
            ? `?eliminados=${mostrarEliminados}`
            : ''
        }`
      )
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          return of([]);
        })
      );
  }

  public obtenerTodosPorRubroYEstado(
    rubroId: number,
    mostrarEliminados?: boolean
  ): Observable<Proveedor[]> {
    return this.http
      .get<Proveedor[]>(
        `${environment.apiUrl}/proveedor/rubro${
          mostrarEliminados != undefined
            ? `?eliminado=${mostrarEliminados}`
            : ''
        }&rubroId=${rubroId}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          return of([]);
        })
      );
  }

  public obtenerProvincias(id: number): Observable<Provincia[]> {
    return this.http
      .get<Provincia[]>(
        `${environment.apiUrl}/proveedor/paises/${id}/provincias`
      )
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public obtenerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${environment.apiUrl}/proveedor/paises`).pipe(
      catchError((error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  public obtenerRubros(): Observable<Rubro[]> {
    return this.http
      .get<Rubro[]>(`${environment.apiUrl}/admin/rubros-activos`)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public obtenerTiposIva(): Observable<TipoIva[]> {
    return this.http
      .get<TipoIva[]>(`${environment.apiUrl}/proveedor/tipos_iva`)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }
}
