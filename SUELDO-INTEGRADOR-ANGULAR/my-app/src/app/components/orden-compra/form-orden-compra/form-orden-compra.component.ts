import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';
import { OrdenCompra } from 'src/app/models/OrdenCompra';
import { Producto } from 'src/app/models/Producto';
import { Proveedor } from 'src/app/models/Proveedor';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/services/alert.service';
import { DetalleOrden } from 'src/app/models/DetalleOrden';

@Component({
  selector: 'app-form-orden-compra',
  templateUrl: './form-orden-compra.component.html',
  styleUrls: ['./form-orden-compra.component.css'],
})
export class FormOrdenCompraComponent implements OnInit {
  ordenCompra: OrdenCompra = {
    id: 0,
    nroOrden: '',
    total: 0.0,
    informacionRecepcion: '',
    informacionAdicional: '',
    fechaEmision: this.ordenCompraService.fechaFormateada(new Date()),
    fechaEntrega: '',
    items: [],
    isActive: true,
  };

  proveedores: Proveedor[] = [];
  productos: Producto[] = [];
  proveedorSeleccionado!: string;
  productoSeleccionadoName!: string;
  cantidadProducto: number = 1;
  faTrash = faTrash;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    private proveedorService: ProveedorService,
    private ordenCompraService: OrdenCompraService,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.proveedorService.findAll().subscribe((res) => {
      this.proveedores = res;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.alertService
        .question(
          '¿Desea generar la orden de compra?',
          true,
          true,
          'Aceptar',
          'Cancelar'
        )
        .then((res) => {
          if (res) {
            let ordenCreada = this.ordenCompraService.create(this.ordenCompra);
            this.alertService.notification(
              `orden de compra creada - Nro : ${ordenCreada.nroOrden}`
            );
            this.router.navigate(['/ordenes-compra']);
          }
        });
    }
  }

  minFechaEntrega() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);
    return currentDate.toISOString().split('T')[0];
  }

  listarProductos(razonSocial: string) {
    this.productos = this.productoService.getProductosByProveedor(razonSocial);
  }

  agregarProducto() {
    let p = this.productos.find(
      (p) => p.nombre == this.productoSeleccionadoName
    );
    if (p) {
      this.alertService
        .question(
          `¿Desea agregar ${this.cantidadProducto} ${p.nombre} ?`,
          true,
          true,
          'Aceptar',
          'Cancelar'
        )
        .then((res) => {
          if (res) {
            const productoExistente = this.ordenCompra.items.find(
              (item) => item.producto.nombre === this.productoSeleccionadoName
            );
            if (productoExistente?.cantidad) {
              productoExistente.cantidad += this.cantidadProducto;
            } else {
              const nuevoItem = {
                id: this.ordenCompraService.idGenerator(),
                precio: p?.precio,
                cantidad: this.cantidadProducto!,
                producto: p!,
              } as DetalleOrden;
              this.ordenCompra.items.push(nuevoItem);
            }
            this.limpiarInputs();
            this.actualizarTotal();
          }
        });
    }
  }

  limpiarInputs() {
    this.productoSeleccionadoName = '';
    this.cantidadProducto = 1;
  }

  actualizarTotal() {
    this.ordenCompra.total = this.ordenCompra.items.reduce(
      (total, item) => total + item.precio * (item.cantidad || 0),
      0
    );
  }

  eliminarProducto(producto: Producto) {
    this.alertService
      .question(
        `¿Desea eliminar ${producto.nombre}?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          const index = this.ordenCompra.items.findIndex(
            (item) => item.producto.id == producto.id
          );
          if (index !== -1) {
            this.ordenCompra.items.splice(index, 1);
            this.actualizarTotal();
          }
        }
      });
  }

  vaciarOrdenCompra(form: NgForm) {
    this.alertService
      .question(
        '¿Desea vaciar la orden de compra?',
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          form.reset();
          this.ordenCompra = {
            id: 0,
            nroOrden: '',
            total: 0.0,
            informacionRecepcion: '',
            informacionAdicional: '',
            fechaEmision: this.ordenCompraService.fechaFormateada(new Date()),
            fechaEntrega: '',
            items: [],
            isActive: true,
          };
          this.cantidadProducto = 1;
        }
      });
  }

  isValidAgregarButton() {
    return !(
      this.proveedorSeleccionado &&
      this.productoSeleccionadoName &&
      this.cantidadProducto > 0
    );
  }
}
