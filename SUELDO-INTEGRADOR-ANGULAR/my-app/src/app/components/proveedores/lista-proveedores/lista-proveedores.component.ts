import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUser,
  faPenToSquare,
  faTrashCan,
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

  proveedores: Proveedor[] = [];

  constructor(
    public proveedorService: ProveedorService,
    private router: Router,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.listarProveedores();
  }

  listarProveedores() {
    this.proveedores = this.proveedorService.findAll();
  }

  // eliminarProveedor(id: string) {
  //   if (this.quiereEliminar(id)) {
  //     this.proveedores = this.proveedorService.deleteById(id);
  //     alert(`Proveedor ${id}, eliminado exitosamente.`);
  //   }
  // }

  editarProveedor(id: string) {
    this.router.navigate(['/proveedores/form-proveedores', id]);
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }

  public eliminarProveedor(id: string): void {
    this.alertService
      .question(
        `¿Desea eliminar al proveedor ${id}?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((data) => {
        if (data) {
          this.proveedores = this.proveedorService.deleteById(id);
          this.alertService.notification(
            `Proveedor ${id}, eliminado exitosamente.`,
            'success'
          );
        }
      });
  }
}
