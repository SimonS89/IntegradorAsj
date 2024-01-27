import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faPenToSquare,
  faTrashCan,
  faCirclePlus,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Producto } from 'src/app/models/Producto';
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

  productos: Producto[] = [];
  mostrarEliminados: boolean = false;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService
      .obtenerTodos(this.mostrarEliminados)
      .subscribe((res) => {
        this.productos = res;
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
}
