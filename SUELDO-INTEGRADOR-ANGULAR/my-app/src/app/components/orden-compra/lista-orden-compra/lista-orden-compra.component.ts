import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBan,
  faCreditCard,
  faChartLine,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { OrdenCompra } from 'src/app/models/OrdenCompra';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';

@Component({
  selector: 'app-lista-orden-compra',
  templateUrl: './lista-orden-compra.component.html',
  styleUrls: ['./lista-orden-compra.component.css'],
})
export class ListaOrdenCompraComponent implements OnInit {
  faBan = faBan;
  faCreditCard = faCreditCard;
  faChartLine = faChartLine;
  faCircleInfo = faCircleInfo;

  ordenesCompra: OrdenCompra[] = [];
  mostrarOrdenesActivas: boolean = false;

  constructor(
    public ordenesCompraService: OrdenCompraService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.listarOrdenes();
  }

  listarOrdenes() {
    this.ordenesCompra = this.ordenesCompraService.findAll() || [];
  }

  cambiarEstadoOrden(id: string, isActive: boolean) {
    let msg = `Desea ${isActive ? `cancelar ` : `activar `}la orden: ${id}`;
    if (confirm(msg))
      this.ordenesCompra = this.ordenesCompraService.cancelById(id);
    this.listarOrdenes();
  }

  mostrarDetalle(id: string) {
    this.router.navigate(['/ordenes-compra/info', id]);
  }

  esFechaPosteriorHoy(fechaString: string): boolean {
    return new Date() > new Date(fechaString);
  }
}
