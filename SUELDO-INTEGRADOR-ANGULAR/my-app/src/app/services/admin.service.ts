import { Injectable } from '@angular/core';
import { Categoria } from '../models/Producto';
import { Rubro } from '../models/Proveedor';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { DashBoard } from '../models/DashBoard';
import { GenericResponse, Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http
      .get<Categoria[]>(`${environment.apiUrl}/admin/categorias`)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http
      .post<Categoria>(`${environment.apiUrl}/admin/categorias`, categoria)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  actualizarCategoria(id: number, categoria: Categoria) {
    return this.http
      .put<Categoria>(`${environment.apiUrl}/admin/categorias/${id}`, categoria)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  actualizarRubro(id: number, rubro: Rubro) {
    return this.http
      .put<Rubro>(`${environment.apiUrl}/admin/rubros/${id}`, rubro)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public obtenerRubros(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(`${environment.apiUrl}/admin/rubros`).pipe(
      catchError((error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  public crearRubro(rubro: Rubro): Observable<Rubro> {
    return this.http
      .post<Rubro>(`${environment.apiUrl}/admin/rubros`, rubro)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public eliminarCategoria(id: number) {
    return this.http
      .delete(`${environment.apiUrl}/admin/categorias/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public eliminarRubro(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/rubros/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al realizar la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  public obtenerInfoDashboard(): Observable<DashBoard> {
    return this.http
      .get<DashBoard>(`${environment.apiUrl}/admin/dashboard`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public obtenerUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${environment.apiUrl}/admin/usuarios`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public asignarOQuitarRolAdmin(id: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${environment.apiUrl}/admin/usuarios/rol/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public eliminarUsuario(id: number): Observable<GenericResponse> {
    return this.http
      .delete<GenericResponse>(`${environment.apiUrl}/admin/usuarios/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }
}
