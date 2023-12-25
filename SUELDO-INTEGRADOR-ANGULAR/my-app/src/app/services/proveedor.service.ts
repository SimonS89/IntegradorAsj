import { Injectable } from '@angular/core';
import { proveedoresEjemplo } from '../data/data';
import { Proveedor } from '../models/Proveedor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private proveedores: Proveedor[] = [];
  private API_ARG = 'https://apis.datos.gob.ar/georef/api/';

  constructor(private http: HttpClient) {
    this.proveedores = proveedoresEjemplo;
  }

  getStorage(key: string) {
    let proveedoresString = localStorage.getItem('proveedores');
    if (proveedoresString)
      this.proveedores = JSON.parse(proveedoresString) || [];
    return this.proveedores;
  }

  setStorage(key: string, proveedores: Proveedor[]) {}

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

  public getProvincias(): Observable<any> | undefined {
    return this.http.get(`${this.API_ARG}provincias?campos=id,nombre`);
  }

  public getCiudades(id: string): Observable<any> | undefined {
    return this.http.get(
      `${this.API_ARG}municipios?provincia=${id}&campos=id,nombre&max=100`
    );
  }
}
