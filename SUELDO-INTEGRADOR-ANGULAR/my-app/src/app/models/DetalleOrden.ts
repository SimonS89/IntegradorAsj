import { Producto } from './Producto';

export interface DetalleOrden {
  id: number;
  precio: number;
  cantidad: number;
  producto: Producto;
}
