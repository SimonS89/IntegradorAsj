import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUser,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Proveedor } from 'src/app/models/Proveedor';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarProveedores();
  }

  listarProveedores() {
    this.proveedores = this.proveedorService.findAll();
  }

  eliminarProveedor(id: string) {
    let confirmar = confirm(`¿Desea eliminar el proveedor ${id}?`);
    if (confirmar) {
      this.proveedores = this.proveedorService.deleteById(id);
      alert(`Proveedor ${id}, eliminado exitosamente.`);
    }
  }

  editarProveedor(id: string) {
    this.router.navigate(['/proveedores/form-proveedores', id]);
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }
}
