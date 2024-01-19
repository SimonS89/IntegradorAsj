import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  nombreUsuario: string = '';
  email: string = '';
  password: string = '';
  rePassword: string = '';
  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      Swal.fire({
        title: 'Usuario creado exitosamente, inice sesión.',
        icon: 'success',
        showConfirmButton: true,
      }).then(() => {
        this.router.navigate(['']);
      });
    }
  }
}
