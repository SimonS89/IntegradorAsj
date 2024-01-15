import { DetalleOrden } from './DetalleOrden';

export interface OrdenCompra {
  id: number;
  nroOrden: string;
  total: number;
  informacionRecepcion: string;
  informacionAdicional: string;
  fechaEmision: string;
  fechaEntrega: string;
  items: DetalleOrden[];
  isActive: boolean;
}
