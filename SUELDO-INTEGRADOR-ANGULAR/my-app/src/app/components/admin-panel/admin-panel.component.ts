import { Component, OnInit } from '@angular/core';
import {
  faPenToSquare,
  faTrashCan,
  faCirclePlus,
  faCheck,
  faInfo,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/services/alert.service';
import { Categoria } from 'src/app/models/Producto';
import { Rubro } from 'src/app/models/Proveedor';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import { EMPTY, catchError } from 'rxjs';
import { RolUsuario, Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faCirclePlus = faCirclePlus;
  faCheck = faCheck;
  faInfo = faInfo;
  faCircleInfo = faCircleInfo;
  constructor(
    public alertService: AlertService,
    public adminService: AdminService
  ) {}
  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];
  rubros: Rubro[] = [];
  rubroFilter: string = '';
  categoriaFilter: string = '';
  usuarioFilter: string = '';
  usuarioActual: string = '';

  ngOnInit(): void {
    this.usuarioActual = localStorage.getItem('user')!;
    this.listarRubros();
    this.listarCategorias();
    this.listarUsuarios();
  }

  listarCategorias() {
    this.adminService.obtenerCategorias().subscribe((res) => {
      this.categorias = res.sort((a, b) =>
        a.categoria.localeCompare(b.categoria)
      );
    });
  }

  listarRubros() {
    this.adminService.obtenerRubros().subscribe((res) => {
      this.rubros = res.sort((a, b) => a.rubro.localeCompare(b.rubro));
    });
  }

  listarUsuarios() {
    console.log('as');
    this.adminService.obtenerUsuarios().subscribe((res) => {
      this.usuarios = res
        .filter((user) => user.username != this.usuarioActual)
        .sort((a, b) => a.username.localeCompare(b.username));
    });
  }

  mostrarRoles(roles: RolUsuario[]): string {
    return roles.map((rol) => rol.rol).join(', ');
  }

  agregarRubro() {
    Swal.fire({
      title: 'Ingrese el Rubro',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async (rubro) => {
        this.adminService
          .crearRubro({ rubro: rubro })
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
          .subscribe((response) => {
            Swal.fire({
              title: `Rubro ${response.rubro} ${
                this.rubroExistente(response.rubro) ? 'reactivado' : 'creado'
              } con éxito!`,
              icon: 'success',
            });
            this.listarRubros();
          });
      },
    });
  }

  agregarCategoria() {
    Swal.fire({
      title: 'Ingrese la Categoria',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async (categoria) => {
        this.adminService
          .crearCategoria({ categoria: categoria })
          .pipe(
            catchError((error: any) => {
              Swal.fire({
                title: `${
                  error.error.errorMessage
                    ? error.error.errorMessage
                    : error.error.categoria
                }`,
                icon: 'error',
              });
              return EMPTY;
            })
          )
          .subscribe((response) => {
            Swal.fire({
              title: `Categoria ${response.categoria} ${
                this.categoriaExistente(response.categoria)
                  ? 'reactivada'
                  : 'creada'
              } con éxito!`,
              icon: 'success',
            });
            this.listarCategorias();
          });
      },
    });
  }

  actualizarCategoria(categoria: Categoria) {
    Swal.fire({
      title: 'Editar Categoria',
      input: 'text',
      inputValue: categoria.categoria,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async (nuevaCategoria) => {
        this.adminService
          .actualizarCategoria(categoria.id!, { categoria: nuevaCategoria })
          .pipe(
            catchError((error: any) => {
              Swal.fire({
                title: `${
                  error.error.errorMessage
                    ? error.error.errorMessage
                    : error.error.categoria
                }`,
                icon: 'error',
              });
              return EMPTY;
            })
          )
          .subscribe((response) => {
            Swal.fire({
              title: `Categoria ${categoria.categoria} actualizada a ${nuevaCategoria} con éxito!`,
              icon: 'success',
            });
            this.listarCategorias();
          });
      },
    });
  }

  actualizarRubro(rubro: Rubro) {
    Swal.fire({
      title: 'Editar Rubro',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      inputValue: rubro.rubro,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async (nuevoRubro) => {
        this.adminService
          .actualizarRubro(rubro.id!, { rubro: nuevoRubro })
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
          .subscribe((response) => {
            Swal.fire({
              title: `Rubro ${rubro.rubro} actualizado a ${nuevoRubro} con éxito!`,
              icon: 'success',
            });
            this.listarRubros();
          });
      },
    });
  }

  eliminarRubro(rubro: Rubro) {
    this.alertService
      .question(
        `Desea ${rubro.eliminado ? 'activar' : 'eliminar'} el rubro ${
          rubro.rubro
        }?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          this.adminService
            .eliminarRubro(rubro.id!)
            .pipe(
              catchError((error: any) => {
                Swal.fire({
                  title: `${error.error.errorMessage}`,
                  icon: 'error',
                });
                return EMPTY;
              })
            )
            .subscribe((res) => {
              Swal.fire({
                title: `Rubro ${
                  rubro.eliminado ? 'activado' : 'eliminado'
                } exitosamente!`,
                icon: 'success',
              });
              this.listarRubros();
            });
        }
      });
  }

  eliminarCategoria(categoria: Categoria) {
    this.alertService
      .question(
        `Desea ${categoria.eliminado ? 'activar' : 'eliminar'} la categoria ${
          categoria.categoria
        }?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          this.adminService
            .eliminarCategoria(categoria.id!)
            .pipe(
              catchError((error: any) => {
                Swal.fire({
                  title: `${error.error.errorMessage}`,
                  icon: 'error',
                });
                return EMPTY;
              })
            )
            .subscribe((res) => {
              Swal.fire({
                title: `Categoria ${
                  categoria.eliminado ? 'activada' : 'eliminada'
                } exitosamente!`,
                icon: 'success',
              });
              this.listarCategorias();
            });
        }
      });
  }

  categoriaExistente(categoria: string): boolean {
    let categoriasString = this.categorias.map((cat) => cat.categoria);
    return categoriasString.includes(categoria);
  }

  rubroExistente(rubro: string): boolean {
    let rubrosString = this.rubros.map((cat) => cat.rubro);
    return rubrosString.includes(rubro);
  }

  agregarOQuitarRol(usuario: Usuario) {
    this.alertService
      .question(
        `¿Desea ${
          usuario.roles.length == 1 ? 'Agregar' : 'Quitar'
        } el rol ADMIN al usuario ${usuario.username}?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          this.adminService
            .asignarOQuitarRolAdmin(usuario.id)
            .pipe(
              catchError((error: any) => {
                Swal.fire({
                  title: `${error.error.errorMessage}`,
                  icon: 'error',
                });
                return EMPTY;
              })
            )
            .subscribe((res) => {
              Swal.fire({
                title: `Rol ADMIN ${
                  res.roles.length == 1 ? 'removido' : 'agregado'
                } exitosamente!`,
                icon: 'success',
              });
              this.listarUsuarios();
            });
        }
      });
  }

  eliminarUsuario(usuario: Usuario) {
    this.alertService
      .question(
        `¿Desea eliminar al usuario  ${usuario.username}?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          this.adminService
            .eliminarUsuario(usuario.id)
            .pipe(
              catchError((error: any) => {
                Swal.fire({
                  title: `${error.error.errorMessage}`,
                  icon: 'error',
                });
                return EMPTY;
              })
            )
            .subscribe((res) => {
              console.log(res);

              Swal.fire({
                title: res.message,
                icon: 'success',
              });
              this.listarUsuarios();
            });
        }
      });
  }
}
