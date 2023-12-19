import { Component } from '@angular/core';
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
export class ListaProveedoresComponent {
  faUser = faUser;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;

  proveedores: any[] = [];

  constructor(public proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.proveedores = this.proveedorService.getData();
  }

  eliminarProveedor(id: string) {
    this.proveedores = this.proveedorService.deleteById(id);
  }
}
