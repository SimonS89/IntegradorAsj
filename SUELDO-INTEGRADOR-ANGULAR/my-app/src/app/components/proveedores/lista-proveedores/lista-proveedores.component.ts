import { Component } from '@angular/core';
import {
  faUser,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css'],
})
export class ListaProveedoresComponent {
  faUser = faUser;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
}
