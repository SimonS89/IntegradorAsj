import { Component, OnInit } from '@angular/core';
import { Categoria, Producto, ProductoForm } from 'src/app/models/Producto';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/models/Proveedor';
import { AlertService } from 'src/app/services/alert.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css'],
})
export class FormProductosComponent implements OnInit {
  producto: ProductoForm = {
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
  productoNombre!: String;
  categorias!: Categoria[];
  skuValido: string = '';
  skuEditar: string = '';

  constructor(
    public productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
    this.listarProveedores();
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      if (this.id) {
        this.productoService.obtenerPorId(this.id).subscribe((res) => {
          this.skuEditar = res.sku;
          this.producto = { ...res };
          this.productoNombre = this.producto.nombre;
        });
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

  editarProducto() {
    this.productoService.actualizar(this.id, this.producto).subscribe((res) => {
      this.irAProductos();
    });
  }

  crearProducto() {
    this.productoService.crear(this.producto).subscribe((res) => {
      this.irAProductos();
    });
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

  listarCategorias() {
    this.productoService.obtenerCategorias().subscribe((res) => {
      this.categorias = res;
    });
  }

  listarProveedores() {
    this.proveedorService.obtenerTodos().subscribe((res) => {
      this.proveedores = res;
    });
  }

  irAProductos() {
    this.router.navigate(['/productos']);
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }

  validarSku() {
    this.skuValido = '';
    this.productoService
      .validarSkuExistente(this.producto.sku)
      .pipe(
        catchError((error) => {
          if (error.status === 400 && this.producto.sku != this.skuEditar) {
            this.skuValido = error.error.errorMessage;
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {});
  }
}
