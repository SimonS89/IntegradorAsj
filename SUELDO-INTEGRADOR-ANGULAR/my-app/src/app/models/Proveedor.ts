export interface NuevoProveedor {
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
  domicilio: NuevoDomicilio;
}

interface NuevoDomicilio {
  calle: string;
  numero: string;
  codigoPostal: string;
  localidad: string;
  provinciaId: number;
  paisId: number;
}

interface NuevoDatosContacto {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  rol: string;
}

export interface Proveedor {
  id: number;
  codigo: string;
  logo: string;
  razonSocial: string;
  telefono: string;
  email: string;
  cuit: string;
  tipoIva: string;
  rubro: string;
  sitioWeb: string;
  domicilio: {
    calle: string;
    numero: string;
    codigoPostal: string;
    localidad: string;
    provincia: Provincia;
  };
  datosContacto: NuevoDatosContacto;
}

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
