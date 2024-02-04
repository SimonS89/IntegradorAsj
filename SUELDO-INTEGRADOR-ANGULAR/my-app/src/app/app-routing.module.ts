import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProveedoresComponent } from './components/proveedores/lista-proveedores/lista-proveedores.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { ListaOrdenCompraComponent } from './components/orden-compra/lista-orden-compra/lista-orden-compra.component';
import { FormProveedoresComponent } from './components/proveedores/form-proveedores/form-proveedores.component';
import { FormProductosComponent } from './components/productos/form-productos/form-productos.component';
import { FormOrdenCompraComponent } from './components/orden-compra/form-orden-compra/form-orden-compra.component';
import { IndexComponent } from './components/index/index.component';
import { OrdenCompraDetailComponent } from './components/orden-compra/orden-compra-detail/orden-compra-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetalleProductoComponent } from './components/productos/detalle-producto/detalle-producto.component';
import { DetalleProveedorComponent } from './components/proveedores/detalle-proveedor/detalle-proveedor.component';

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'ASJ Login' },
  { path: 'register', component: RegisterComponent, title: 'ASJ Register' },
  {
    path: 'index',
    component: IndexComponent,
    title: 'ASJ Servicios',
    data: { titulo: 'Home' },
  },
  {
    path: 'proveedores',
    children: [
      {
        path: '',
        component: ListaProveedoresComponent,
        title: 'Lista Proveedores',
        data: { titulo: 'Lista Proveedores' },
      },
      {
        path: 'form-proveedores',
        component: FormProveedoresComponent,
        title: 'Crear Proveedor',
        data: { titulo: 'Crear Proveedor' },
      },
      {
        path: 'form-proveedores/:id',
        component: FormProveedoresComponent,
        title: 'Editar Proveedor',
        data: { titulo: 'Editar Proveedor' },
      },
      {
        path: 'detalle-proveedor/:id',
        component: DetalleProveedorComponent,
        title: 'Detalle Proveedor',
        data: { titulo: 'Detalle Proveedor' },
      },
    ],
  },
  {
    path: 'productos',
    children: [
      {
        path: '',
        component: ListaProductosComponent,
        title: 'Lista Productos',
        data: { titulo: 'Lista Productos' },
      },
      {
        path: 'form-productos',
        component: FormProductosComponent,
        title: 'Crear Producto',
        data: { titulo: 'Crear Producto' },
      },
      {
        path: 'form-productos/:id',
        component: FormProductosComponent,
        title: 'Editar Producto',
        data: { titulo: 'Editar Producto' },
      },
      {
        path: 'detalle-producto/:id',
        component: DetalleProductoComponent,
        title: 'Detalle Producto',
        data: { titulo: 'Detalle Producto' },
      },
    ],
  },
  {
    path: 'ordenes-compra',
    children: [
      {
        path: '',
        component: ListaOrdenCompraComponent,
        title: 'Lista Ordenes Compra',
        data: { titulo: 'Lista Ordenes Compra' },
      },
      {
        path: 'form-ordenes-compra',
        component: FormOrdenCompraComponent,
        title: 'Registrar Orden Compra',
        data: { titulo: 'Registrar Orden Compra' },
      },
      {
        path: 'form-ordenes-compra/:id',
        component: FormOrdenCompraComponent,
        title: 'Editar Orden Compra',
        data: { titulo: 'Editar Orden Compra' },
      },
      {
        path: 'info/:id',
        component: OrdenCompraDetailComponent,
        title: 'Info Orden Compra',
        data: { titulo: 'Info Orden Compra' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
