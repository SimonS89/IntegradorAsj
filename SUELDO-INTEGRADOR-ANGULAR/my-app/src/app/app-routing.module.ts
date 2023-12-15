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
    component: ListaProveedoresComponent,
  },
  {
    path: 'productos',
    component: ListaProductosComponent,
  },
  {
    path: 'ordenes-compra',
    component: ListaOrdenCompraComponent,
  },
  {
    path: 'form-proveedores',
    component: FormProveedoresComponent,
  },
  {
    path: 'form-productos',
    component: FormProductosComponent,
  },
  {
    path: 'form-ordenes-compra',
    component: FormOrdenCompraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
