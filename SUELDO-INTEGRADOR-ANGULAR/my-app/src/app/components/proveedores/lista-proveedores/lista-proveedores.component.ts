import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUser,
  faPenToSquare,
  faTrashCan,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Proveedor } from 'src/app/models/Proveedor';
import { AlertService } from 'src/app/services/alert.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css'],
})
export class ListaProveedoresComponent implements OnInit {
  faUser = faUser;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faCheck = faCheck;

  proveedores: Proveedor[] = [];
  mostrarEliminados: boolean = false;

  constructor(
    public proveedorService: ProveedorService,
    private router: Router,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.listarProveedores();
  }

  listarProveedores() {
    this.proveedorService
      .obtenerTodos(this.mostrarEliminados)
      .subscribe((res) => {
        this.proveedores = res;
      });
  }

  editarProveedor(id: number) {
    this.router.navigate(['/proveedores/form-proveedores', id]);
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }

  public eliminarProveedor(proveedor: Proveedor): void {
    this.alertService
      .question(
        `¿Desea ${
          this.mostrarEliminados ? 'Activar' : 'Eliminar'
        } el proveedor ${proveedor.razonSocial}?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          this.proveedores = this.proveedorService
            .eliminarPorId(proveedor.id)
            .subscribe((res: any) => {
              this.listarProveedores();
            });
          this.alertService.notification(
            `Proveedor ${proveedor.razonSocial}, ${
              this.mostrarEliminados ? 'Activado' : 'Eliminado'
            } exitosamente.`,
            'success'
          );
        }
      });
  }
}
