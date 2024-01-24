import { Injectable } from '@angular/core';
import { proveedoresEjemplo } from '../data/data';
import { Proveedor, Rubro, TipoIva } from '../models/Proveedor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../models/Proveedor';
import { Provincia } from '../models/Proveedor';
@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private proveedores: Proveedor[] = this.findAll() || [];

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

  public findAll(): Proveedor[] {
    let proveedores = this.getStorage('proveedores');
    if (proveedores) this.proveedores = proveedores || [];
    return this.proveedores;
  }

  public getById(id: number): Proveedor | undefined {
    return this.proveedores.find((proveedor) => proveedor.id == id);
  }

  public deleteById(id: number): Proveedor[] {
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

  public getProvincias(id: number): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(
      `${environment.apiUrl}/proveedor/paises/${id}/provincias`
    );
  }

  public getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${environment.apiUrl}/proveedor/paises`);
  }

  idGenerator(): number {
    return new Date().getTime();
  }

  public getRubros(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(`${environment.apiUrl}/admin/rubros`);
  }

  public getTiposIva(): Observable<TipoIva[]>{
    return this.http.get<TipoIva[]>(`${environment.apiUrl}/proveedor/tipos_iva`);
  }
}
