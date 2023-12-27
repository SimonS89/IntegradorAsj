import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';
import { OrdenCompra } from 'src/app/models/OrdenCompra';
import { Producto } from 'src/app/models/Producto';
import { Proveedor } from 'src/app/models/Proveedor';

@Component({
  selector: 'app-form-orden-compra',
  templateUrl: './form-orden-compra.component.html',
  styleUrls: ['./form-orden-compra.component.css'],
})
export class FormOrdenCompraComponent implements OnInit {
  ordenCompra: OrdenCompra = {
    id: '',
    total: 0.0,
    informacionRecepcion: '',
    fechaEmision: this.ordenCompraService.fechaFormateada(new Date()),
    fechaEntrega: '',
    productos: [],
    isActive: true,
  };

  proveedores: Proveedor[] = [];
  productos: Producto[] = [];
  proveedorSeleccionado: string = '';
  productoSeleccionado: string = '';

  constructor(
    public productoService: ProductoService,
    private router: Router,
    private proveedorService: ProveedorService,
    private ordenCompraService: OrdenCompraService
  ) {}

  ngOnInit(): void {
    this.proveedores = this.proveedorService.findAll();
  }

  onSubmit(form: NgForm) {}

  minFechaEntrega() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);
    return currentDate.toISOString().split('T')[0];
  }

  listarProductos(razonSocial: string) {
    this.productos = this.productoService.getProductosByProveedor(razonSocial);
    console.log(this.productos);
  }
}
