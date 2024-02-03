import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faCheck,
  faCircleInfo,
  faCirclePlus,
  faInfo,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Proveedor } from 'src/app/models/Proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css'],
})
export class DetalleProveedorComponent implements OnInit {
  proveedor!: Proveedor;
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  constructor(
    public proveedorService: ProveedorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    this.proveedorService.obtenerPorIdDetalle(id).subscribe((res) => {
      this.proveedor = res;
    });
  }

  handleImageError(event: any) {
    event.target.src =
      'https://img.freepik.com/vector-premium/foto-vacia-sombra-pegada-cinta-adhesiva-ilustracion_87543-3824.jpg';
  }

  editarProveedor(arg0: number) {
    throw new Error('Method not implemented.');
  }
  eliminarProveedor(arg0: Proveedor) {
    throw new Error('Method not implemented.');
  }
}
