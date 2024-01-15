import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/models/Proveedor';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css'],
})
export class FormProductosComponent implements OnInit {
  producto: Producto = {
    id: 0,
    sku: '',
    imagen: '',
    nombre: '',
    precio: 0.0,
    descripcion: '',
    categoria: '',
    proveedor: '',
  };

  id!: number;
  proveedores: Proveedor[] = [];
  productoTitle!: String;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService,
    public alertService: AlertService
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
    if (form.valid) {
      this.alertService
        .question(
          this.id
            ? `¿Desea editar el producto/servicio ${this.producto.nombre}?`
            : '¿Desea dar de alta al nuevo producto/servicio?',
          true,
          true,
          'Aceptar',
          'Cancelar'
        )
        .then((res) => {
          if (res) {
            this.id ? this.editProduct() : this.createProduct();
            this.alertService.notification(
              `Producto, ${
                this.producto.nombre ? 'editado' : 'Generado'
              } exitosamente.`,
              'success'
            );
          }
        });
    }
  }

  vaciarForm(form: NgForm) {
    this.alertService
      .question(
        '¿Desea vaciar el formulario?',
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          form.reset();
        }
      });
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
