import { Producto } from './Producto';

export interface OrdenCompra {
  id: string;
  nroOrden: string;
  total: number;
  informacionRecepcion: string;
  informacionAdicional: string;
  fechaEmision: string;
  fechaEntrega: string;
  productos: Producto[];
  isActive: boolean;
}
