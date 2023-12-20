import { Injectable } from '@angular/core';
import { proveedoresEjemplo } from '../data/data';
import { Proveedor } from '../models/Proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private proveedores: Proveedor[] = [];
  constructor() {
    this.proveedores = proveedoresEjemplo;
  }

  public getData() {
    return this.proveedores;
  }

  public getById(id: string): Proveedor | undefined {
    return this.proveedores.find((proveedor) => proveedor.id == id);
  }

  public deleteById(id: string) {
    this.proveedores = this.proveedores.filter(
      (proveedor) => proveedor.id !== id
    );
    return this.proveedores;
  }

  public create(proveedor: Proveedor) {
    proveedor.id = `ID-A${new Date().getTime().toString().slice(-6)}`;
    return this.proveedores.push(proveedor);
  }

  update(proveedor: Proveedor) {
    const index = this.proveedores.findIndex((p) => p.id == proveedor.id);
    if (index !== 1) this.proveedores[index] = proveedor;
    else
      console.error(
        `Proveedor con ID ${proveedor.id} no encontrado para actualizar.`
      );
  }
}
