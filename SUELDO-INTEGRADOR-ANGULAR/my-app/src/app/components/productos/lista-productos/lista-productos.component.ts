import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  faPenToSquare,
  faTrashCan,
  faCirclePlus,
  faCheck,
  faInfo,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { Categoria, Producto } from 'src/app/models/Producto';
import { AlertService } from 'src/app/services/alert.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faCirclePlus = faCirclePlus;
  faCheck = faCheck;
  faInfo = faInfo;
  faCircleInfo = faCircleInfo;
  columnasMostradas = [
    'logo',
    'sku',
    'nombre',
    'precio',
    'categoria',
    'proveedor',
    'Funcionalidades',
  ];

  categoriaId: string = '0';
  categorias: Categoria[] = [];
  productos: Producto[] = [];
  mostrarEliminados: boolean = false;
  datosTabla!: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    public alertService: AlertService,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit(): void {
    this.listarProductos();
    this.listarCategorias();
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  }

  listarProductos() {
    this.productoService
      .obtenerTodosPorCategoriaYEstado(
        Number(this.categoriaId),
        this.mostrarEliminados
      )
      .subscribe((res) => {
        this.productos = res.sort((a: any, b: any) => {
          a = a.nombre.split(' ')[0].toLowerCase();
          b = b.nombre.split(' ')[0].toLowerCase();
          return a > b ? 1 : b > a ? -1 : 0;
        });
        this.datosTabla = new MatTableDataSource(res);
        this.datosTabla.paginator = this.paginator;
        this.datosTabla.sort = this.sort;
      });
  }

  editarProducto(id: number) {
    this.router.navigate(['/productos/form-productos', id]);
  }

  eliminarProducto(producto: Producto): void {
    this.alertService
      .question(
        `¿Desea ${
          this.mostrarEliminados ? 'Activar' : 'Eliminar'
        } el producto ${producto.nombre}?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          this.productoService
            .eliminarPorId(producto.id)
            .subscribe((res: any) => {
              this.listarProductos();
              this.alertService.notification(
                `Producto ${producto.nombre}, ${
                  this.mostrarEliminados ? 'Activado' : 'Eliminado'
                }  exitosamente.`
              );
            });
        }
      });
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }

  textoIngresado(data: KeyboardEvent) {
    const value = (data.target as HTMLInputElement).value.trim().toLowerCase();
    this.datosTabla.filter = value;
    if (value) {
      this.datosTabla.filterPredicate = (
        producto: Producto,
        filtro: string
      ) => {
        return (
          producto.categoria.categoria.toLowerCase().includes(filtro) ||
          producto.proveedor!.razonSocial.toLowerCase().includes(filtro) ||
          producto.sku.toLowerCase().includes(filtro) ||
          producto.nombre.toLowerCase().includes(filtro)
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

  listarCategorias() {
    this.productoService.obtenerCategorias().subscribe((res) => {
      this.categorias = res;
    });
  }

  productoDetalle(id: number) {
    this.router.navigate(['/productos/detalle-producto', id]);
  }
}
