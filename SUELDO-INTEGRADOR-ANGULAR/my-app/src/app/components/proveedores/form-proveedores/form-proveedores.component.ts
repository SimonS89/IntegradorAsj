import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  ProveedorForm,
  Proveedor,
  Rubro,
  TipoIva,
} from 'src/app/models/Proveedor';
import { AlertService } from 'src/app/services/alert.service';
import { Pais } from 'src/app/models/Proveedor';
import { Provincia } from 'src/app/models/Proveedor';
@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form-proveedores.component.html',
  styleUrls: ['./form-proveedores.component.css'],
})
export class FormProveedoresComponent implements OnInit {
  proveedor: ProveedorForm = {
    codigo: '',
    logo: '',
    razonSocial: '',
    telefono: '',
    email: '',
    cuit: '',
    tipoIvaId: 0,
    rubroId: 0,
    sitioWeb: '',
    provinciaId: 0,
    paisId: 0,
    domicilio: {
      calle: '',
      numero: '',
      codigoPostal: '',
      localidad: '',
    },
    representanteContacto: {
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
  rubros!: Rubro[];
  tiposIva!: TipoIva[];
  primerRender: boolean = true;

  constructor(
    public proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.listarRubros();
    this.listarTiposIva();
    this.route.params.subscribe((data) => {
      this.listarPaises();
      this.id = data['id'];
      if (this.id) {
        this.proveedorService.getById(this.id).subscribe((res) => {
          this.listarProvincias(res.paisId);
          this.proveedor = { ...res };
          this.razonSocialTitle = this.proveedor.razonSocial;
        });
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
    this.proveedorService
      .edit(this.id, this.proveedor)
      .subscribe((res) => this.navigateToProveedores());
  }

  addProveedor() {
    this.proveedorService
      .create(this.proveedor)
      .subscribe((res) => this.navigateToProveedores());
  }

  navigateToProveedores() {
    this.router.navigate(['/proveedores']);
  }

  listarProvincias(id: number) {
    this.proveedorService.getProvincias(id).subscribe((res) => {
      this.provincias = res;
      if (!this.primerRender) this.proveedor.provinciaId = 0;
      this.primerRender = false;
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

  listarRubros() {
    this.proveedorService.getRubros().subscribe((res) => (this.rubros = res));
  }

  listarTiposIva() {
    this.proveedorService.getTiposIva().subscribe((res) => {
      this.tiposIva = res;
    });
  }
}
