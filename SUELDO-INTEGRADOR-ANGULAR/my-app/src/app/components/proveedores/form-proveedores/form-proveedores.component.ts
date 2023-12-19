import { Component, ViewChild } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form-proveedores.component.html',
  styleUrls: ['./form-proveedores.component.css'],
})
export class FormProveedoresComponent {
  razonSocial: string = '';
  tipoIva: string = '';
  rubro: string = '';
  sitioWeb: string = '';
  direccion: string = '';
  codigoPostal: string = '';
  localidad: string = '';
  provincia: string = '';
  pais: string = '';
  nombreCompleto: string = '';
  telefono: string = '';
  email: string = '';
  rol: string = '';

  @ViewChild('proveedorForm')
  proveedorForm!: NgForm;

  constructor(
    public proveedorService: ProveedorService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.proveedorForm.valid) {
      this.proveedorService.create({
        id: `ID-${new Date().getTime().toString().slice(-6)}`,
        razonSocial: this.razonSocial,
        tipoIva: this.tipoIva,
        rubro: this.rubro,
        sitioWeb: this.sitioWeb,
        domicilio: {
          direccion: this.direccion,
          codigoPostal: this.codigoPostal,
          localidad: this.localidad,
          provincia: this.provincia,
          pais: this.pais,
        },
        datosContacto: {
          nombreCompleto: this.nombreCompleto,
          telefono: this.telefono,
          email: this.email,
          rol: this.rol,
        },
      });
      this.router.navigate(['/proveedores']);
    } else {
      // Form is invalid, handle accordingly (show error messages, etc.)
      console.log('Form is invalid. Please check all fields.');
    }
  }
}
