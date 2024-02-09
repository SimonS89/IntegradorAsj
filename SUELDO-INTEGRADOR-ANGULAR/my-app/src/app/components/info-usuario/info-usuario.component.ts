import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { actualizarPassword } from 'src/app/models/Usuario';
import { AlertService } from 'src/app/services/alert.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css'],
})
export class InfoUsuarioComponent implements OnInit {
  constructor(
    public usuarioService: UsuarioService,
    private router: Router,
    public alertService: AlertService
  ) {}

  usuario: actualizarPassword = {
    currentPassword: '',
    password: '',
    rePassword: '',
  };

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      Swal.fire({
        title: '¿Confirma el cambio de contraseña?',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          Swal.showLoading();
          try {
            await this.usuarioService
              .actualizarPassword(this.usuario)
              .toPromise();
            Swal.fire({
              title: 'Contraseña actualizada correctamente.',
              icon: 'success',
              showConfirmButton: true,
            });
          } catch (error: any) {
            Swal.fire({
              title:
                error.error.errorMessage ||
                'Error al actualizar la contraseña.',
              icon: 'error',
            });
          } finally {
            Swal.hideLoading();
          }
        },
      });
    }
  }
}
