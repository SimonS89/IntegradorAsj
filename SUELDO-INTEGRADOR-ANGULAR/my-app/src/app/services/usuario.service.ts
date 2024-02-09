import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GenericResponse,
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
          throw error;
        })
      );
  }

  public recuperarPassword(username: String): Observable<GenericResponse> {
    return this.http
      .get<GenericResponse>(
        `${environment.apiUrl}/usuario/recuperar_password/${username}`
      )
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  public actualizarPassword(
    usuario: actualizarPassword
  ): Observable<GenericResponse> {
    return this.http
      .patch<GenericResponse>(
        `${environment.apiUrl}/usuario/modificar_password`,
        usuario
      )
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  public resetearPassword(username: String): Observable<GenericResponse> {
    return this.http
      .get<GenericResponse>(
        `${environment.apiUrl}/usuario/resetear_password/${username}`
      )
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  public validarUsernameExistente(username: string): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${environment.apiUrl}/usuario/validar/${username}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }
}
