import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  faeye = faEye;
  mostrarPassword: boolean = false;
  recuperarPassword!: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    public authService: AuthService,
    public usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.recuperarPassword = data['username'];
      if (this.recuperarPassword) {
        Swal.showLoading();
        this.usuarioService
          .resetearPassword(this.recuperarPassword)
          .pipe(
            catchError((error: any) => {
              Swal.fire({
                title: `${
                  error.error.errorMessage
                    ? error.error.errorMessage
                    : error.error.rubro
                }`,
                icon: 'error',
              });
              return EMPTY;
            }),
            takeUntil(this.destroy$)
          )
          .subscribe((response) => {
            Swal.close();
            Swal.fire({
              title: response.message,
              icon: 'success',
            });
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService
        .login(this.username, this.password)
        .pipe(
          catchError((error: any) => {
            Swal.fire({
              title: `${error.error.access_denied_reason}`,
              icon: 'error',
            });
            return EMPTY;
          })
        )
        .subscribe((res) => {
          this.router.navigate(['index']);
        });
    }
  }

  cambiarVisibilidad() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  resetearEstado() {
    this.mostrarPassword = false;
  }

  recuperarContrasenia() {
    Swal.fire({
      title: 'Ingrese su nombre de usuario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async (username) => {
        Swal.showLoading();
        return this.usuarioService
          .recuperarPassword(username)
          .pipe(
            catchError((error: any) => {
              Swal.fire({
                title: `${
                  error.error.errorMessage
                    ? error.error.errorMessage
                    : error.error.rubro
                }`,
                icon: 'error',
              });
              return EMPTY;
            })
          )
          .toPromise()
          .then((response) => {
            Swal.fire({
              title: response!.message,
              icon: 'success',
            });
          })
          .finally(() => {
            Swal.hideLoading();
          });
      },
    });
  }

  mantenerConectadoChanged(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.authService.mantenerConectado(checkbox.checked);
  }
}
