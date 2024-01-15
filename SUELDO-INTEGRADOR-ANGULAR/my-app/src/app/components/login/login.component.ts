import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  resetPasswordState() {
    throw new Error('Method not implemented.');
  }
  togglePassword() {
    throw new Error('Method not implemented.');
  }
  email!: string;
  password!: string;
  faeye = faEye;
  mostrarPassword: boolean = false;
  constructor(private router: Router) {}
  onSubmit(form: NgForm) {
    this.router.navigate(['index']);
  }

  cambiarVisibilidad() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  resetearEstado() {
    this.mostrarPassword = false;
  }
}
