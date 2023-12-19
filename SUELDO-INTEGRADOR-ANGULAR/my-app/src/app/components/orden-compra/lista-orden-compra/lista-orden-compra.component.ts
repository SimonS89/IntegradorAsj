import { Component, OnInit } from '@angular/core';
import {
  faTrashCan,
  faPenToSquare,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';

@Component({
  selector: 'app-lista-orden-compra',
  templateUrl: './lista-orden-compra.component.html',
  styleUrls: ['./lista-orden-compra.component.css'],
})
export class ListaOrdenCompraComponent implements OnInit {
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;
  faCreditCard = faCreditCard;

  ordenesCompra: any[] = [];

  constructor(public ordenesCompraService: OrdenCompraService) {}
  ngOnInit(): void {
    this.ordenesCompra = this.ordenesCompraService.getData();
  }

  eliminarOrden(id: string) {
    this.ordenesCompra = this.ordenesCompraService.deleteById(id);
  }
}
