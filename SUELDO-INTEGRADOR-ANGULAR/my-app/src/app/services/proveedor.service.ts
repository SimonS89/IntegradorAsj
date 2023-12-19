import { Injectable } from '@angular/core';
import { proveedoresEjemplo } from '../data/data';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private proveedores: any[] = [];
  constructor() {
    this.proveedores = proveedoresEjemplo;
  }

  public getData() {
    return this.proveedores;
  }

  public getById(id: string) {
    return this.proveedores.find((proveedor) => proveedor.id == id);
  }

  public deleteById(id: string) {
    this.proveedores = this.proveedores.filter(
      (proveedor) => proveedor.id !== id
    );
    return this.proveedores;
  }

  public create(proveedor: any) {
    return this.proveedores.push(proveedor);
  }
}
