import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioForm } from 'src/app/models/Usuario';
import { AlertService } from 'src/app/services/alert.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  usuario: UsuarioForm = {
    username: '',
    email: '',
    password: '',
    rePassword: '',
  };

  usernameValido: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    public alertService: AlertService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      Swal.fire({
        title: '¿Confirmar alta de usuario ' + this.usuario.username,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          Swal.showLoading();
          try {
            const response = await this.usuarioService
              .crear(this.usuario)
              .toPromise();
            Swal.fire({
              title: 'Usuario creado exitosamente, inice sesión.',
              icon: 'success',
              showConfirmButton: true,
            });
            this.router.navigate(['']); // Redirige al usuario a una página después de la creación exitosa
          } catch (error: any) {
            Swal.fire({
              title: error.error.errorMessage || 'Error al crear el usuario.',
              icon: 'error',
            });
          } finally {
            Swal.hideLoading();
          }
        },
      });
    }
  }

  validarUsername() {
    this.usernameValido = '';
    this.usuarioService
      .validarUsernameExistente(this.usuario.username)
      .pipe(
        catchError((error) => {
          if (error.status === 400) {
            this.usernameValido = error.error.errorMessage;
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
