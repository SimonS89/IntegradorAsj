import { Injectable } from '@angular/core';
import { proveedoresEjemplo } from '../data/data';
import { ProveedorForm, Proveedor, Rubro, TipoIva } from '../models/Proveedor';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../models/Proveedor';
import { Provincia } from '../models/Proveedor';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private proveedores: Proveedor[] = [];

  constructor(private http: HttpClient) {
    this.setStorage('proveedores', proveedoresEjemplo);
  }

  getStorage(key: string): Proveedor[] | undefined {
    let proveedoresString = localStorage.getItem(key);
    if (proveedoresString) return JSON.parse(proveedoresString);
    return undefined;
  }

  setStorage(key: string, proveedores: Proveedor[]) {
    localStorage.setItem(key, JSON.stringify(proveedores));
  }

  public deleteById(id: number): any {
    return this.http.delete<any>(`${environment.apiUrl}/proveedor/${id}`).pipe(
      catchError((error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  public create(proveedor: ProveedorForm): Observable<Proveedor> {
    return this.http
      .post<Proveedor>(`${environment.apiUrl}/proveedor`, proveedor)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error.stat);
          if (error instanceof HttpErrorResponse) {
            console.log('Codigo ', error.status);
            console.log('Mensaje ', error.message);
          }
          throw error;
        })
      );
  }

  public edit(id: number, proveedor: ProveedorForm): Observable<Proveedor> {
    return this.http
      .put<Proveedor>(`${environment.apiUrl}/proveedor/${id}`, proveedor)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public getById(id: number): Observable<ProveedorForm> {
    return this.http
      .get<ProveedorForm>(`${environment.apiUrl}/proveedor/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
          throw error;
        })
      );
  }

  public findAll(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${environment.apiUrl}/proveedor`).pipe(
      catchError((error) => {
        console.error('Error al realizar la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  public update(proveedor: Proveedor): void {
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

  public getTiposIva(): Observable<TipoIva[]> {
    return this.http.get<TipoIva[]>(
      `${environment.apiUrl}/proveedor/tipos_iva`
    );
  }
}
