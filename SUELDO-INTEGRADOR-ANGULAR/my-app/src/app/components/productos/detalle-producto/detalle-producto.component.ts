import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
})
export class DetalleProductoComponent implements OnInit {
  producto!: Producto;
  faStar = faStar;

  constructor(
    public productoService: ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    this.productoService.obtenerPorIdDetalle(id).subscribe((res) => {
      this.producto = res;
      console.log(this.producto);
    });
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }
}
