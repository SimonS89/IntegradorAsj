import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/models/Proveedor';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css'],
})
export class FormProductosComponent implements OnInit {
  producto: Producto = {
    id: '',
    sku: '',
    imagen: '',
    nombre: '',
    precio: 0.0,
    descripcion: '',
    categoria: '',
    proveedor: '',
  };

  id!: string;
  proveedores: Proveedor[] = [];
  productoTitle!: String;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.proveedores = this.proveedorService.findAll();
      const productoExistente = this.productoService.getById(this.id);
      if (productoExistente) {
        this.producto = { ...productoExistente };
        this.productoTitle = this.producto.nombre;
      }
    });
  }

  onSubmit(form: NgForm) {
    const confirmMessage = this.id
      ? `¿Desea editar el producto/servicio ${this.id}?`
      : '¿Desea dar de alta al nuevo producto/servicio?';
    if (form.valid) {
      if (confirm(confirmMessage)) {
        this.id ? this.editProduct() : this.createProduct();
      }
    }
  }

  editProduct() {
    this.productoService.update(this.producto);
    this.navigateToProductos();
  }

  createProduct() {
    this.productoService.create(this.producto);
    this.navigateToProductos();
  }

  navigateToProductos() {
    this.router.navigate(['/productos']);
  }
}
