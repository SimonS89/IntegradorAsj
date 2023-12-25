export interface Proveedor {
  id: string;
  logo: string;
  razonSocial: string;
  cuit: string;
  tipoIva: string;
  rubro: string;
  sitioWeb: string;
  domicilio: {
    direccion: string;
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
