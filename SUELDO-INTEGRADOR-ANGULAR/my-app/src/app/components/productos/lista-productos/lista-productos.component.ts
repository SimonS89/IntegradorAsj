import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faPenToSquare,
  faTrashCan,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { Producto } from 'src/app/models/Producto';
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

  productos: Producto[] = [];

  constructor(
    public productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.productos = this.productoService.findAll();
    this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  eliminarProducto(id: string) {
    let confirmar = confirm(`¿Desea eliminar el producto? ${id}`);
    if (confirmar) {
      this.productos = this.productoService.deleteById(id);
      alert(`Producto ${id}, eliminado exitosamente.`);
    }
  }

  editarProducto(id: string) {
    this.router.navigate(['/productos/form-productos', id]);
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }
}
