import { Component, OnInit } from '@angular/core';
import {
  faPenToSquare,
  faTrashCan,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
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

  productos: any[] = [];

  constructor(public productoService: ProductoService) {}

  ngOnInit(): void {
    this.productos = this.productoService.getData();
  }

  eliminarProducto(id: string) {
    this.productos = this.productoService.deleteById(id);
  }
}
