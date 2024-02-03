import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenCompra } from 'src/app/models/OrdenCompra';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';

@Component({
  selector: 'app-orden-compra-detail',
  templateUrl: './orden-compra-detail.component.html',
  styleUrls: ['./orden-compra-detail.component.css'],
})
export class OrdenCompraDetailComponent implements OnInit {
  ordenCompra!: OrdenCompra;

  constructor(
    public ordenCompraService: OrdenCompraService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    this.ordenCompraService.obtenerPorId(id).subscribe((res) => {
      this.ordenCompra = res;
    });
  }

  esFechaPosteriorHoy(fechaString: string): boolean {
    return new Date() > new Date(fechaString);
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }
}
