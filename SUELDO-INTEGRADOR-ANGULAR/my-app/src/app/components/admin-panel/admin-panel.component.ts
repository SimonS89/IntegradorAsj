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
  rubros: Rubro[] = [];
  ngOnInit(): void {
    this.listarRubros();
    this.listarCategorias();
  }

  listarCategorias() {
    this.adminService.obtenerCategorias().subscribe((res) => {
      this.categorias = res;
      console.log(this.categorias);
    });
  }

  listarRubros() {
    this.adminService.obtenerRubros().subscribe((res) => {
      this.rubros = res;
      console.log(this.rubros);
    });
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

  agregarCategoria(categoriaSeleccionada?: Categoria) {
    console.log(categoriaSeleccionada);

    Swal.fire({
      title: 'Ingrese la Categoria',
      input: 'text',
      inputValue: categoriaSeleccionada ? categoriaSeleccionada.categoria : '',
      inputAttributes: {
        autocapitalize: 'off',
      },
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
}
