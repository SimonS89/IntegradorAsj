import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  faUser,
  faPenToSquare,
  faTrashCan,
  faCheck,
  faInfo,
  faCircleInfo,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { Proveedor, Rubro } from 'src/app/models/Proveedor';
import { AlertService } from 'src/app/services/alert.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css'],
})
export class ListaProveedoresComponent implements OnInit {
  faUser = faUser;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faCheck = faCheck;
  faInfo = faInfo;
  faCircleQuestion = faCircleQuestion;
  faCircleInfo = faCircleInfo;
  columnasMostradas = [
    'logo',
    'codigo',
    'razonSocial',
    'rubro',
    'paisProvincia',
    'sitioWebEmailTelefono',
    'Funcionalidades',
  ];

  rubroId: string = '0';
  rubros: Rubro[] = [];
  proveedores: Proveedor[] = [];
  mostrarEliminados: boolean = false;
  datosTabla!: MatTableDataSource<Proveedor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public proveedorService: ProveedorService,
    private router: Router,
    public alertService: AlertService,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit(): void {
    this.listarProveedores();
    this.listarRubros();
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  }

  listarProveedores() {
    this.proveedorService
      .obtenerTodosPorRubroYEstado(Number(this.rubroId), this.mostrarEliminados)
      .subscribe((res) => {
        this.proveedores = res;
        this.datosTabla = new MatTableDataSource(res);
        this.datosTabla.paginator = this.paginator;
        this.datosTabla.sort = this.sort;
      });
  }

  editarProveedor(id: number) {
    this.router.navigate(['/proveedores/form-proveedores', id]);
  }

  public eliminarProveedor(proveedor: Proveedor): void {
    this.alertService
      .question(
        `¿Desea ${
          this.mostrarEliminados ? 'Activar' : 'Eliminar'
        } el proveedor ${
          proveedor.razonSocial
        }? La acción se replicará en sus productos`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          this.proveedorService
            .eliminarPorId(proveedor.id)
            .subscribe((res: any) => {
              this.listarProveedores();
              this.alertService.notification(
                `Proveedor ${proveedor.razonSocial}, ${
                  this.mostrarEliminados ? 'Activado' : 'Eliminado'
                } exitosamente.`,
                'success'
              );
            });
        }
      });
  }

  textoIngresado(data: KeyboardEvent) {
    const value = (data.target as HTMLInputElement).value.trim().toLowerCase();
    this.datosTabla.filter = value;
    if (value) {
      this.datosTabla.filterPredicate = (
        proveedor: Proveedor,
        filtro: string
      ) => {
        return (
          proveedor.rubro.rubro.toLowerCase().includes(filtro) ||
          proveedor.codigo.toLowerCase().includes(filtro) ||
          proveedor.razonSocial.toLowerCase().includes(filtro) ||
          proveedor.domicilio.provincia.nombre.toLowerCase().includes(filtro) ||
          proveedor.domicilio.provincia.pais.nombre
            .toLowerCase()
            .includes(filtro) ||
          proveedor.representanteContacto.nombre
            .toLowerCase()
            .includes(filtro) ||
          proveedor.representanteContacto.apellido
            .toLowerCase()
            .includes(filtro) ||
          proveedor.rubro.rubro.toLowerCase().includes(filtro)
        );
      };
    }
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }

  listarRubros() {
    this.proveedorService.obtenerRubros().subscribe((res) => {
      this.rubros = res;
    });
  }

  obtenerInfo(proveedor: Proveedor): string {
    return `Sitio web: ${proveedor.sitioWeb}\nEmail: ${proveedor.email}\nTel: ${proveedor.telefono}`;
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }

  proveedorDetalle(id: number) {
    this.router.navigate(['/proveedores/detalle-proveedor', id]);
  }
}
