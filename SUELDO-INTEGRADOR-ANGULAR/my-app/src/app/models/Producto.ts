export interface Producto {
  id: number;
  sku: string;
  imagen: string;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string;
  proveedor: string;
  cantidad?: number;
}
