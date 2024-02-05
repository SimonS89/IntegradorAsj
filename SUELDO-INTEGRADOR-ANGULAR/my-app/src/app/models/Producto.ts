import { Proveedor } from './Proveedor';

export interface ProductoForm {
  id?: number;
  sku: string;
  imagen: string;
  nombre: string;
  precio: number;
  descripcion: string;
  categoriaId: number;
  proveedorId: number;
}

export interface Producto {
  id: number;
  sku: string;
  imagen: string;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
  proveedor?: Proveedor;
}

export interface Categoria {
  id?: number;
  categoria: string;
  eliminado?: boolean;
}
