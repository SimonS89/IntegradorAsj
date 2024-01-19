import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log({
        nombreUsuario: this.nombreUsuario,
        email: this.email,
        password: this.password,
        rePassword: this.rePassword,
      });
    }
  }
}
