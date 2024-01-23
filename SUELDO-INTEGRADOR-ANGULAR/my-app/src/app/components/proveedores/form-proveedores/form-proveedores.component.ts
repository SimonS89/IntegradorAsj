import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Proveedor } from 'src/app/models/Proveedor';
import { Provincia } from 'src/app/models/Provincia';
import { AlertService } from 'src/app/services/alert.service';
import { Pais } from 'src/app/models/Pais';

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
      provincia: {
        id: 0,
        nombre: '',
        pais: {
          id: 0,
          nombre: '',
        },
      },
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
  paises!: Pais[];

  constructor(
    public proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.listarPaises();
      this.id = data['id'];
      const proveedorExistente = this.proveedorService.getById(this.id);
      if (proveedorExistente) {
        this.listarProvincias(proveedorExistente.domicilio.provincia.pais.id);
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

  listarProvincias(id: number) {
    this.proveedorService.getProvincias(id).subscribe((res) => {
      this.provincias = res;
    });
  }

  listarPaises() {
    this.proveedorService.getPaises().subscribe((res) => {
      this.paises = res;
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
