import { Producto } from './Producto';

export interface OrdenCompra {
  id: string;
  total: number;
  informacionRecepcion: string;
  fechaEmision: string;
  fechaEntrega: string;
  productos: Producto[];
  isActive: boolean;
}
