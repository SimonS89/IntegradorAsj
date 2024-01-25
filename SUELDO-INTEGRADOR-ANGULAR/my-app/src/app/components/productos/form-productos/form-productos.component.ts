import { Component, OnInit } from '@angular/core';
import { Categoria, Producto, ProductoForm } from 'src/app/models/Producto';
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
  producto: ProductoForm = {
    id: 0,
    sku: '',
    imagen: '',
    nombre: '',
    precio: 0.0,
    descripcion: '',
    categoriaId: 0,
    proveedorId: 0,
  };

  id!: number;
  proveedores: Proveedor[] = [];
  productoTitle!: String;
  categorias!: Categoria[];

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
      this.proveedorService.obtenerTodos().subscribe((res) => {
        this.proveedores = res;
      });
      const productoExistente = this.productoService.obtenerPorId(this.id);
      if (productoExistente) {
        // this.producto = { ...productoExistente };
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
            this.id ? this.editarProducto() : this.crearProducto();
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

  editarProducto() {
    // this.productoService.actualizar(this.producto);
    this.irAProductos();
  }

  crearProducto() {
    // this.productoService.crear(this.producto);
    this.irAProductos();
  }

  listarCategorias() {
    this.productoService.obtenerCategorias().subscribe((res) => {
      this.categorias = res;
    });
  }

  irAProductos() {
    this.router.navigate(['/productos']);
  }
}
