import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { UsuarioLogin } from '../models/Usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<UsuarioLogin> {
    return this.http
      .post<UsuarioLogin>(`${environment.apiUrl}/usuario/autenticar`, {
        username,
        password,
      })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.username);
        }),
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

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
