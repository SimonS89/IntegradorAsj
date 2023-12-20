import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProveedoresComponent } from './components/proveedores/lista-proveedores/lista-proveedores.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { ListaOrdenCompraComponent } from './components/orden-compra/lista-orden-compra/lista-orden-compra.component';
import { FormProveedoresComponent } from './components/proveedores/form-proveedores/form-proveedores.component';
import { FormProductosComponent } from './components/productos/form-productos/form-productos.component';
import { FormOrdenCompraComponent } from './components/orden-compra/form-orden-compra/form-orden-compra.component';

const routes: Routes = [
  {
    path: 'proveedores',
    children: [
      {
        path: '',
        component: ListaProveedoresComponent,
        title: 'Lista Proveedores',
      },
      {
        path: 'form-proveedores',
        component: FormProveedoresComponent,
        title: 'Crear Proveedor',
      },
      {
        path: 'form-proveedores/:id',
        component: FormProveedoresComponent,
        title: 'Editar Proveedor',
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
      },
      {
        path: 'form-productos',
        component: FormProductosComponent,
        title: 'Form Productos',
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
      },
      {
        path: 'form-ordenes-compra',
        component: FormOrdenCompraComponent,
        title: 'Form Ordenes Compra',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
