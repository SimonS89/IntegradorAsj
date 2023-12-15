import { Component } from '@angular/core';
import {
  faTrashCan,
  faPenToSquare,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista-orden-compra',
  templateUrl: './lista-orden-compra.component.html',
  styleUrls: ['./lista-orden-compra.component.css'],
})
export class ListaOrdenCompraComponent {
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;
  faCreditCard = faCreditCard;
}
