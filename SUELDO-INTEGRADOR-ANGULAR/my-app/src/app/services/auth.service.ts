import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  usuario: string = 'user1';
  contrasena: string = 'user1';

  login(username: string, password: string) {
    if (username === this.usuario && this.contrasena === password) {
      localStorage.setItem('token', 'asd123');
      localStorage.setItem('user', username);
      return true;
    } else return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
