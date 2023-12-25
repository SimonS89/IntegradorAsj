import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Proveedor } from 'src/app/models/Proveedor';
import { Provincia } from 'src/app/models/Provincia';
import { Ciudad } from 'src/app/models/Ciudad';

@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form-proveedores.component.html',
  styleUrls: ['./form-proveedores.component.css'],
})
export class FormProveedoresComponent implements OnInit {
  proveedor: Proveedor = {
    id: '',
    logo: '',
    razonSocial: '',
    cuit: '',
    tipoIva: '',
    rubro: '',
    sitioWeb: '',
    domicilio: {
      direccion: '',
      codigoPostal: '',
      localidad: '',
      provincia: '',
      pais: '',
    },
    datosContacto: {
      nombreCompleto: '',
      telefono: '',
      email: '',
      rol: '',
    },
  };

  provincias!: Provincia[];
  ciudades!: Ciudad[];

  constructor(
    public proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const id = data['id'];
      const proveedorExistente = this.proveedorService.getById(id);
      if (proveedorExistente) {
        this.proveedor = { ...proveedorExistente };
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.proveedor.id) {
        let confirmar = confirm(
          `¿Desea editar el proveedor ${this.proveedor.id}?`
        );
        if (confirmar) {
          this.proveedorService.update(this.proveedor);
          this.router.navigate(['/proveedores']);
        }
      } else {
        let confirmar = confirm('¿Desea dar de alta al nuevo proveedor?');
        if (confirmar) {
          this.proveedorService.create(this.proveedor);
          this.router.navigate(['/proveedores']);
        }
      }
    }
  }

  listarProvincias() {
    this.proveedorService.getProvincias()?.subscribe((res) => {
      this.provincias = res;
    });
  }

  listarCiudades(id: string) {
    this.proveedorService.getCiudades(id)?.subscribe((res) => {
      this.ciudades = res;
    });
  }
}
