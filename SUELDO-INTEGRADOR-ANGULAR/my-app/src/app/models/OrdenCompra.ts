import { Producto } from './Producto';
import { Proveedor } from './Proveedor';

export interface OrdenCompra {
  id?: number;
  numeroOrden: string;
  total: number;
  infoRecepcion: string;
  infoAdicional: string;
  fechaEmision: string;
  fechaEntrega: string;
  proveedor?: Proveedor;
  detallesOrden: DetalleOrden[];
  activa: boolean;
}

export interface DetalleOrden {
  id?: number;
  precio: number;
  cantidad: number;
  producto: Producto;
}
