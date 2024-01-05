import { Injectable } from '@angular/core';
import { proveedoresEjemplo } from '../data/data';
import { Proveedor } from '../models/Proveedor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private proveedores: Proveedor[] = this.findAll() || [];
  private API_ARG = 'https://apis.datos.gob.ar/georef/api/';

  constructor(private http: HttpClient) {
    // this.setStorage('proveedores', proveedoresEjemplo);
  }

  getStorage(key: string): Proveedor[] | undefined {
    let proveedoresString = localStorage.getItem(key);
    if (proveedoresString) return JSON.parse(proveedoresString);
    return undefined;
  }

  setStorage(key: string, proveedores: Proveedor[]) {
    localStorage.setItem(key, JSON.stringify(proveedores));
  }

  public findAll() {
    let proveedores = this.getStorage('proveedores');
    if (proveedores) this.proveedores = proveedores || [];
    return this.proveedores;
  }

  public getById(id: string): Proveedor | undefined {
    return this.proveedores.find((proveedor) => proveedor.id == id);
  }

  public deleteById(id: string) {
    this.proveedores = this.proveedores.filter(
      (proveedor) => proveedor.id !== id
    );
    this.setStorage('proveedores', this.proveedores);
    return this.proveedores;
  }

  public create(proveedor: Proveedor): void {
    proveedor.id = this.idGenerator();
    this.proveedores.push(proveedor);
    this.setStorage('proveedores', this.proveedores);
  }

  update(proveedor: Proveedor): void {
    const index = this.proveedores.findIndex((p) => p.id == proveedor.id);
    if (index !== -1) {
      this.proveedores[index] = proveedor;
      this.setStorage('proveedores', this.proveedores);
    } else
      console.error(
        `Proveedor con ID ${proveedor.id} no encontrado para actualizar.`
      );
  }

  public getProvincias(): Observable<any> | undefined {
    return this.http.get(`${this.API_ARG}provincias?campos=id,nombre`);
  }

  public getCiudades(provincia: string): Observable<any> | undefined {
    return this.http.get(
      `${this.API_ARG}municipios?provincia=${provincia}&campos=id,nombre&max=200`
    );
  }

  idGenerator(): string {
    return new Date().getTime().toString();
  }
}
