import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  RecPasswordResponse,
  Usuario,
  UsuarioForm,
  actualizarPassword,
} from '../models/Usuario';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  public crear(usuario: UsuarioForm): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${environment.apiUrl}/usuario`, usuario)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error.status);
          if (error instanceof HttpErrorResponse) {
            console.log('Codigo ', error.status);
            console.log('Mensaje ', error.message);
          }
          throw error;
        })
      );
  }

  public recuperarPassword(username: String): Observable<RecPasswordResponse> {
    return this.http
      .get<RecPasswordResponse>(
        `${environment.apiUrl}/usuario/recuperar_password/${username}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error.status);
          if (error instanceof HttpErrorResponse) {
            console.log('Codigo ', error.status);
            console.log('Mensaje ', error.message);
          }
          throw error;
        })
      );
  }

  public actualizarPassword(
    usuario: actualizarPassword
  ): Observable<RecPasswordResponse> {
    return this.http
      .patch<RecPasswordResponse>(
        `${environment.apiUrl}/usuario/modificar_password`,
        usuario
      )
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error.status);
          throw error;
        })
      );
  }

  public resetearPassword(username: String): Observable<RecPasswordResponse> {
    return this.http
      .get<RecPasswordResponse>(
        `${environment.apiUrl}/usuario/resetear_password/${username}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error.status);
          if (error instanceof HttpErrorResponse) {
            console.log('Codigo ', error.status);
            console.log('Mensaje ', error.message);
          }
          throw error;
        })
      );
  }

  public validarUsernameExistente(username: string): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${environment.apiUrl}/usuario/validar/${username}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud HTTP:', error.status);
          throw error;
        })
      );
  }
}
