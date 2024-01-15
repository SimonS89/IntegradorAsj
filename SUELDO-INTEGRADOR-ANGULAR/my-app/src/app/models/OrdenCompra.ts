import { Producto } from './Producto';

export interface OrdenCompra {
  id: number;
  nroOrden: string;
  total: number;
  informacionRecepcion: string;
  informacionAdicional: string;
  fechaEmision: string;
  fechaEntrega: string;
  productos: Producto[];
  isActive: boolean;
}
