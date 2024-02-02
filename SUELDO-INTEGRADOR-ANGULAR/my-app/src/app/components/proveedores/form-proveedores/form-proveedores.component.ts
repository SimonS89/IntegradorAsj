import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProveedorForm, Rubro, TipoIva } from 'src/app/models/Proveedor';
import { AlertService } from 'src/app/services/alert.service';
import { Pais } from 'src/app/models/Proveedor';
import { Provincia } from 'src/app/models/Proveedor';
import { EMPTY, catchError } from 'rxjs';
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
  codigoValido: string = '';
  cuitValido: string = '';
  cuitEditar: string = '';
  codigoEditar: string = '';

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
        this.proveedorService.obtenerPorId(this.id).subscribe((res) => {
          this.cuitEditar = res.cuit;
          this.codigoEditar = res.codigo;
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
            this.id ? this.editarProveedor() : this.crearProveedor();
            this.alertService.notification(
              `Proveedor, ${this.id ? 'editado' : 'Generado'} exitosamente.`,
              'success'
            );
          }
        });
    }
  }

  editarProveedor() {
    this.proveedorService
      .actualizar(this.id, this.proveedor)
      .subscribe((res) => this.irAProveedores());
  }

  crearProveedor() {
    this.proveedorService.crear(this.proveedor).subscribe((res) => {
      this.irAProveedores();
    });
  }

  listarProvincias(id: number) {
    this.proveedorService.obtenerProvincias(id).subscribe((res) => {
      this.provincias = res;
      if (!this.primerRender) this.proveedor.provinciaId = 0;
      this.primerRender = false;
    });
  }

  listarPaises() {
    this.proveedorService.obtenerPaises().subscribe((res) => {
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
    this.proveedorService
      .obtenerRubros()
      .subscribe((res) => (this.rubros = res));
  }

  listarTiposIva() {
    this.proveedorService.obtenerTiposIva().subscribe((res) => {
      this.tiposIva = res;
    });
  }

  irAProveedores() {
    this.router.navigate(['/proveedores']);
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }

  validarCodigo() {
    this.codigoValido = '';
    this.proveedorService
      .validarCodigoExistente(this.proveedor.codigo)
      .pipe(
        catchError((error) => {
          if (
            error.status === 400 &&
            this.proveedor.codigo != this.codigoEditar
          ) {
            this.codigoValido = error.error.errorMessage;
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  validarCuit() {
    this.cuitValido = '';
    this.proveedorService
      .validarCuitExistente(this.proveedor.cuit)
      .pipe(
        catchError((error) => {
          if (error.status === 400 && this.proveedor.cuit != this.cuitEditar) {
            this.cuitValido = error.error.errorMessage;
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
