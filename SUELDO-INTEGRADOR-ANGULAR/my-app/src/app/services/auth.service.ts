import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { RolUsuario, UsuarioLogin } from '../models/Usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    window.onbeforeunload = () => {
      if (!this.obtenerConectado()) {
        this.logout();
      }
    };
  }

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
          if (this.obtenerConectado() == null) this.mantenerConectado(true);
          localStorage.setItem('roles', JSON.stringify(response.roles));
        }),
        catchError((error) => {
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
    localStorage.removeItem('conectado');
    this.router.navigate(['']);
  }

  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  mantenerConectado(mantener: boolean) {
    console.log(mantener);

    localStorage.setItem('conectado', JSON.stringify(mantener));
  }

  obtenerConectado(): boolean {
    return JSON.parse(localStorage.getItem('conectado')!);
  }

  obtenerRoles(): RolUsuario[] {
    return JSON.parse(localStorage.getItem('roles')!);
  }
}
