import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBan,
  faCreditCard,
  faChartLine,
  faCircleInfo,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { OrdenCompra } from 'src/app/models/OrdenCompra';
import { AlertService } from 'src/app/services/alert.service';
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
  faPenToSquare = faPenToSquare;

  ordenesCompra: OrdenCompra[] = [];
  mostrarOrdenesActivas: boolean = false;

  constructor(
    public ordenesCompraService: OrdenCompraService,
    private router: Router,
    public alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.listarOrdenes();
  }

  listarOrdenes() {
    this.ordenesCompraService
      .obtenerTodos(this.mostrarOrdenesActivas)
      .subscribe((res) => {
        this.ordenesCompra = res;
      });
  }

  cambiarEstadoOrden(orden: OrdenCompra, activa: boolean) {
    this.alertService
      .question(
        `Desea ${activa ? `cancelar ` : `activar `}la orden: ${
          orden.numeroOrden
        }?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res)
          this.ordenesCompraService
            .cambiarEstado(orden.id!)
            .subscribe((res) => {
              this.listarOrdenes();
            });
      });
  }

  mostrarDetalle(id: number) {
    this.router.navigate(['/ordenes-compra/info', id]);
  }

  esFechaPosteriorHoy(fechaString: string): boolean {
    return new Date() > new Date(fechaString);
  }

  editarOrden(id: number) {
    this.router.navigate(['/ordenes-compra/form-ordenes-compra', id]);
  }
}
