import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUser,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
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

  proveedores: any[] = [];

  constructor(
    public proveedorService: ProveedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.proveedores = this.proveedorService.getData();
  }

  eliminarProveedor(id: string) {
    let confirmar = confirm('¿Desea eliminar el proveedor?');
    if (confirmar) this.proveedores = this.proveedorService.deleteById(id);
  }

  editarProveedor(id: string) {
    this.router.navigate(['/proveedores/form-proveedores', id]);
  }
}
