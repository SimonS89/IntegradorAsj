import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Proveedor } from 'src/app/models/Proveedor';
import { Provincia } from 'src/app/models/Provincia';
import { Ciudad } from 'src/app/models/Ciudad';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form-proveedores.component.html',
  styleUrls: ['./form-proveedores.component.css'],
})
export class FormProveedoresComponent implements OnInit {
  proveedor: Proveedor = {
    id: 0,
    codigo: '',
    logo: '',
    razonSocial: '',
    telefono: '',
    email: '',
    cuit: '',
    tipoIva: '',
    rubro: '',
    sitioWeb: '',
    domicilio: {
      calle: '',
      numero: '',
      codigoPostal: '',
      localidad: '',
      provincia: '',
      pais: 'Argentina',
    },
    datosContacto: {
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      rol: '',
    },
  };

  id!: number;
  razonSocialTitle!: string;
  provincias!: Provincia[];
  ciudades!: Ciudad[];

  constructor(
    public proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.listarProvincias();
      this.id = data['id'];
      const proveedorExistente = this.proveedorService.getById(this.id);
      if (proveedorExistente) {
        proveedorExistente.domicilio.pais = 'Argentina';
        this.proveedor = { ...proveedorExistente };
        this.razonSocialTitle = proveedorExistente.razonSocial;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.alertService
        .question(
          this.id
            ? `¿Desea editar el proveedor ${this.proveedor.razonSocial}?`
            : '¿Desea dar de alta al nuevo proveedor?',
          true,
          true,
          'Aceptar',
          'Cancelar'
        )
        .then((res) => {
          if (res) {
            this.id ? this.editProveedor() : this.addProveedor();
            this.alertService.notification(
              `Proveedor, ${this.id ? 'editado' : 'Generado'} exitosamente.`,
              'success'
            );
          }
        });
    }
  }

  editProveedor() {
    this.proveedorService.update(this.proveedor);
    this.navigateToProveedores();
  }

  addProveedor() {
    this.proveedorService.create(this.proveedor);
    this.navigateToProveedores();
  }

  navigateToProveedores() {
    this.router.navigate(['/proveedores']);
  }

  listarProvincias() {
    this.proveedorService.getProvincias()?.subscribe((res) => {
      this.provincias = res.provincias;
    });
  }

  listarCiudades(id: string) {
    this.proveedorService.getCiudades(id)?.subscribe((res) => {
      this.ciudades = res.municipios;
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
}
