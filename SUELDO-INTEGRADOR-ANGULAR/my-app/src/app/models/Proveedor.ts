export interface ProveedorForm {
  id?: number;
  codigo: string;
  logo: string;
  razonSocial: string;
  telefono: string;
  email: string;
  cuit: string;
  tipoIvaId: number;
  rubroId: number;
  sitioWeb: string;
  provinciaId: number;
  paisId: number;
  domicilio: NuevoDomicilio;
  representanteContacto: NuevoRepresentanteContacto;
}

interface NuevoDomicilio {
  id?: number;
  calle: string;
  numero: string;
  codigoPostal: string;
  localidad: string;
}

interface NuevoRepresentanteContacto {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  rol: string;
}

interface Domicilio {
  id?: number;
  calle: string;
  numero: string;
  codigoPostal: string;
  localidad: string;
  provincia: Provincia;
}

export interface Proveedor {
  id: number;
  codigo: string;
  logo: string;
  razonSocial: string;
  telefono: string;
  email: string;
  cuit: string;
  sitioWeb: string;
  tipoIva: TipoIva;
  rubro: Rubro;
  domicilio: Domicilio;
  representanteContacto: NuevoRepresentanteContacto;
}

export interface ProveedorMin {}

export interface TipoIva {
  id: number;
  tipoIva: string;
}

export interface Provincia {
  id: number;
  nombre: string;
  pais: Pais;
}

export interface Pais {
  id: number;
  nombre: string;
}

export interface Rubro {
  id: number;
  rubro: string;
}
