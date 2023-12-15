import { Component } from '@angular/core';
import {
  faPenToSquare,
  faTrashCan,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent {
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faCirclePlus = faCirclePlus;
}
