import { Provincia } from "./Provincia";

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
  datosContacto: {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    rol: string;
  };
}
