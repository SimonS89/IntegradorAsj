import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ListaProveedoresComponent } from './components/proveedores/lista-proveedores/lista-proveedores.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { FormProductosComponent } from './components/productos/form-productos/form-productos.component';
import { ListaOrdenCompraComponent } from './components/orden-compra/lista-orden-compra/lista-orden-compra.component';
import { FormOrdenCompraComponent } from './components/orden-compra/form-orden-compra/form-orden-compra.component';
import { FormProveedoresComponent } from './components/proveedores/form-proveedores/form-proveedores.component';
import { FormsModule } from '@angular/forms';
import { FiltrarOrdenesPipe } from './pipes/filtrar-ordenes.pipe';
import { IndexComponent } from './components/index/index.component';
import { OrdenCompraDetailComponent } from './components/orden-compra-detail/orden-compra-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    ListaProveedoresComponent,
    ListaProductosComponent,
    FormProductosComponent,
    ListaOrdenCompraComponent,
    FormOrdenCompraComponent,
    FormProveedoresComponent,
    FiltrarOrdenesPipe,
    IndexComponent,
    OrdenCompraDetailComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
