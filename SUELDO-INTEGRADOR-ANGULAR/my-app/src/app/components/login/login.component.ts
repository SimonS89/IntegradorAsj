import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username!: string;
  password!: string;
  usuario: string = 'user1';
  contrasena: string = 'user1';
  faeye = faEye;
  mostrarPassword: boolean = false;

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.username === this.usuario && this.contrasena === this.password) {
        Swal.fire({
          title: 'Bienvenido/a a ASJ servicios',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate(['index']);
        });
      } else {
        Swal.fire({
          title: 'Usuario o contraseña incorrecta',
          text: 'Verifica tus credenciales',
          icon: 'error',
        }).then(() => {
          this.username = '';
          this.password = '';
        });
      }
    }
  }

  cambiarVisibilidad() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  resetearEstado() {
    this.mostrarPassword = false;
  }
}
