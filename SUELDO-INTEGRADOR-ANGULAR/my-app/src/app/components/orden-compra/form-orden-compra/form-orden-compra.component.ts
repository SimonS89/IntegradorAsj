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
  proveedorSeleccionado!: string;
  productoSeleccionadoName!: string;
  cantidadProducto: number = 0;
  productoSeleccionado!: Producto;
  faTrash = faTrash;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    private proveedorService: ProveedorService,
    private ordenCompraService: OrdenCompraService
  ) {}

  ngOnInit(): void {
    this.proveedores = this.proveedorService.findAll();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.ordenCompra.id = this.ordenCompraService.idGenerator();
      if (confirm('Desea realizar la compra ?')) {
        let id = this.ordenCompraService.create(this.ordenCompra);
        alert(`orden de compra creada - ID : ${id}`);
        this.router.navigate(['/ordenes-compra']);
      }
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
      const confirmacion = confirm(
        `¿Desea agregar ${p.nombre} con cantidad ${this.cantidadProducto}?`
      );
      if (confirmacion) {
        const productoExistente = this.ordenCompra.productos.find(
          (producto) => producto.nombre === this.productoSeleccionadoName
        );

        if (productoExistente?.cantidad) {
          productoExistente.cantidad += this.cantidadProducto;
        } else {
          const nuevoProducto = { ...p };
          nuevoProducto.cantidad = this.cantidadProducto;
          this.ordenCompra.productos.push(nuevoProducto);
        }

        this.limpiarInputs();
        this.actualizarTotal();
      }
    }
  }

  limpiarInputs() {
    this.productoSeleccionadoName = '';
    this.cantidadProducto = 0;
  }

  actualizarTotal() {
    this.ordenCompra.total = this.ordenCompra.productos.reduce(
      (total, producto) => total + producto.precio * (producto.cantidad || 0),
      0
    );
  }

  eliminarProducto(producto: Producto) {
    const confirmacion = confirm(`¿Desea eliminar ${producto.nombre}?`);
    if (confirmacion) {
      const index = this.ordenCompra.productos.indexOf(producto);
      if (index !== -1) {
        this.ordenCompra.productos.splice(index, 1);
        this.actualizarTotal();
      }
    }
  }

  vaciarOrdenCompra(form: NgForm) {
    const confirmacion = confirm('¿Desea vaciar la orden de compra?');
    if (confirmacion) {
      form.reset();
      this.ordenCompra = {
        id: '',
        total: 0.0,
        informacionRecepcion: '',
        fechaEmision: this.ordenCompraService.fechaFormateada(new Date()),
        fechaEntrega: '',
        productos: [],
        isActive: true,
      };
    }
  }

  isValidAgregarButton() {
    return !(
      this.proveedorSeleccionado &&
      this.productoSeleccionadoName &&
      this.cantidadProducto > 0
    );
  }
}
