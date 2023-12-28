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
    const id = this.route.snapshot.paramMap.get('id')!;
    this.ordenCompra = { ...this.ordenCompraService.getById(id)! }!;
    console.log(this.ordenCompra);
  }
}
