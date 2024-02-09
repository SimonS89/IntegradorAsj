import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  faBan,
  faCreditCard,
  faChartLine,
  faCircleInfo,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { OrdenCompra } from 'src/app/models/OrdenCompra';
import { Proveedor } from 'src/app/models/Proveedor';
import { AlertService } from 'src/app/services/alert.service';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-lista-orden-compra',
  templateUrl: './lista-orden-compra.component.html',
  styleUrls: ['./lista-orden-compra.component.css'],
})
export class ListaOrdenCompraComponent implements OnInit {
  faBan = faBan;
  faCreditCard = faCreditCard;
  faChartLine = faChartLine;
  faCircleInfo = faCircleInfo;
  faPenToSquare = faPenToSquare;
  columnasMostradas = [
    'numeroOrden',
    'total',
    'infoRecepcion',
    'fechaEmision',
    'fechaEntrega',
    'estado',
    'Funcionalidades',
  ];
  ordenesCompra: OrdenCompra[] = [];
  proveedores: Proveedor[] = [];
  mostrarOrdenesActivas: boolean = false;
  datosTabla!: MatTableDataSource<OrdenCompra>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public ordenesCompraService: OrdenCompraService,
    private router: Router,
    public alertService: AlertService,
    private paginatorIntl: MatPaginatorIntl,
    public proveedorService: ProveedorService
  ) {}
  ngOnInit(): void {
    this.listarOrdenes();
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  }

  listarOrdenes() {
    this.ordenesCompraService
      .obtenerTodos(this.mostrarOrdenesActivas)
      .subscribe((res) => {
        this.ordenesCompra = res;
        this.datosTabla = new MatTableDataSource(res);
        this.datosTabla.paginator = this.paginator;
        this.datosTabla.sort = this.sort;
      });
  }

  cambiarEstadoOrden(orden: OrdenCompra, activa: boolean) {
    this.alertService
      .question(
        `Desea ${activa ? `cancelar ` : `activar `}la orden: ${
          orden.numeroOrden
        }?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res)
          this.ordenesCompraService
            .cambiarEstado(orden.id!)
            .subscribe((res) => {
              this.listarOrdenes();
            });
      });
  }

  mostrarDetalle(id: number) {
    this.router.navigate(['/ordenes-compra/info', id]);
  }

  esFechaPosteriorHoy(fechaString: string): boolean {
    return new Date() > new Date(fechaString);
  }

  editarOrden(id: number) {
    this.router.navigate(['/ordenes-compra/form-ordenes-compra', id]);
  }

  listarProveedores() {
    this.proveedorService.obtenerTodos().subscribe((res) => {
      this.proveedores = res;
    });
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

  textoIngresado(data: KeyboardEvent) {
    const value = (data.target as HTMLInputElement).value.trim().toLowerCase();
    this.datosTabla.filter = value;
    if (value) {
      this.datosTabla.filterPredicate = (
        orden: OrdenCompra,
        filtro: string
      ) => {
        return (
          orden.numeroOrden.toLowerCase().includes(filtro) ||
          orden.infoRecepcion.toLowerCase().includes(filtro) ||
          this.transformarFecha(orden.fechaEntrega).includes(filtro) ||
          this.transformarFecha(orden.fechaEmision).includes(filtro)
        );
      };
    }
  }

  transformarFecha(fechaString: string) {
    const [anio, mes, dia] = fechaString.split('-');
    return `${dia}/${mes}/${anio}`;
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }
}
