export interface Proveedor {
  id: string;
  codigo: string;
  logo: string;
  razonSocial: string;
  cuit: string;
  tipoIva: string;
  rubro: string;
  sitioWeb: string;
  domicilio: {
    calle: string;
    numero: string;
    codigoPostal: string;
    localidad: string;
    provincia: string;
    pais: string;
  };
  datosContacto: {
    nombreCompleto: string;
    telefono: string;
    email: string;
    rol: string;
  };
}
