let proveedoresEjemplo = [
  {
    id: "ID-A00132",
    razonSocial: "ByteCraft Solutions",
    tipoIva: "Responsable Inscripto",
    rubro: "Tecnología",
    sitioWeb: "http://www.ByteCraftSolutions.com",
    domicilio: {
      direccion: "Calle A Nº 123",
      codigoPostal: "CP12345",
      localidad: "Ciudad A",
      provincia: "Provincia A",
      pais: "Argentina",
    },
    datosContacto: {
      nombreCompleto: "Juan Pérez",
      telefono: "555-1234",
      email: "juan.perez@empresaA.com",
      rol: "Gerente General",
    },
  },
  {
    id: "ID-A00134",
    razonSocial: "FreshBite Delights",
    tipoIva: "Monotributista",
    rubro: "Alimentación",
    sitioWeb: "http://www.FreshBiteDelights.com",
    domicilio: {
      direccion: "Avenida B Nº 456",
      codigoPostal: "CP54321",
      localidad: "Ciudad B",
      provincia: "Provincia B",
      pais: "Argentina",
    },
    datosContacto: {
      nombreCompleto: "Ana García",
      telefono: "555-5678",
      email: "ana.garcia@empresaB.com",
      rol: "Directora de Ventas",
    },
  },
  {
    id: "ID-A09872",
    razonSocial: "VogueHarbor Boutique",
    tipoIva: "Responsable Inscripto",
    rubro: "Moda",
    sitioWeb: "http://www.VogueHarborBoutique.com",
    domicilio: {
      direccion: "Calle C Nº 789",
      codigoPostal: "CP67890",
      localidad: "Ciudad C",
      provincia: "Provincia C",
      pais: "Argentina",
    },
    datosContacto: {
      nombreCompleto: "Martín López",
      telefono: "555-9876",
      email: "martin.lopez@empresaC.com",
      rol: "Gerente de Marketing",
    },
  },
  {
    id: "ID-A10132",
    razonSocial: "Revitalize Med Group",
    tipoIva: "Exento",
    rubro: "Salud",
    sitioWeb: "http://www.RevitalizeMedGroup.com",
    domicilio: {
      direccion: "Avenida D Nº 1011",
      codigoPostal: "CP101112",
      localidad: "Ciudad D",
      provincia: "Provincia D",
      pais: "Argentina",
    },
    datosContacto: {
      nombreCompleto: "Laura Rodríguez",
      telefono: "555-1111",
      email: "laura.rodriguez@empresaD.com",
      rol: "Director Médico",
    },
  },
  {
    id: "ID-A055132",
    razonSocial: "IntellectJunction Institute",
    tipoIva: "Responsable Inscripto",
    rubro: "Educación",
    sitioWeb: "http://www.IntellectJunctionInstitute.com",
    domicilio: {
      direccion: "Calle E Nº 1213",
      codigoPostal: "CP121314",
      localidad: "Ciudad E",
      provincia: "Provincia E",
      pais: "Argentina",
    },
    datosContacto: {
      nombreCompleto: "Carlos Pérez",
      telefono: "555-1212",
      email: "carlos.perez@empresaE.com",
      rol: "Director Académico",
    },
  },
];

let productosEjemplo = [
  {
    id: "SKU-A00132",
    nombre: "Smartphone X",
    precio: 599.99,
    descripcion: "Teléfono inteligente de última generación",
    categoria: "Electrónica",
    proveedor: "ByteCraft Solutions",
  },
  {
    id: "SKU-B00132",
    nombre: "Pack de Galletas",
    precio: 12.99,
    descripcion: "Variado pack de galletas para toda la familia",
    categoria: "Alimentos",
    proveedor: "FreshBite Delights",
  },
  {
    id: "SKU-C00111",
    nombre: "Camisa Elegante",
    precio: 49.99,
    descripcion: "Camisa de alta calidad para ocasiones especiales",
    categoria: "Ropa",
    proveedor: "VogueHarbor Boutique",
  },
  {
    id: "SKU-D00143",
    nombre: "Kit de Primeros Auxilios",
    precio: 29.99,
    descripcion: "Kit esencial para emergencias médicas",
    categoria: "Salud",
    proveedor: "Revitalize Med Group",
  },
  {
    id: "SKU-E00551",
    nombre: "Curso de Programación",
    precio: 89.99,
    descripcion: "Curso online para aprender programación",
    categoria: "Educación",
    proveedor: "IntellectJunction Institute",
  },
];

let ordenesEjemplo = [
  {
    id: "OC-104101",
    producto: "Smartphone X",
    cantidad: 3,
    total: 1799.97,
    informacionRecepcion: "Recepcionado por: Marta Sánchez",
    proveedor: "ByteCraft Solutions",
    fechaEntrega: "2023-01-15",
    fechaEmision: "2023-01-10",
  },
  {
    id: "OC-158002",
    producto: "Pack de Galletas",
    cantidad: 5,
    total: 64.95,
    informacionRecepcion: "Recepcionado por: Daniel González",
    proveedor: "FreshBite Delights",
    fechaEmision: "2023-02-05",
    fechaEntrega: "2023-02-10",
  },
  {
    id: "OC-169003",
    producto: "Camisa Elegante",
    cantidad: 2,
    total: 99.98,
    informacionRecepcion: "Recepcionado por: Laura Rodríguez",
    proveedor: "VogueHarbor Boutique",
    fechaEmision: "2023-03-20",
    fechaEntrega: "2023-03-25",
  },
  {
    id: "OC-100454",
    producto: "Kit de Primeros Auxilios",
    cantidad: 1,
    total: 29.99,
    informacionRecepcion: "Recepcionado por: Alejandro Martínez",
    proveedor: "Revitalize Med Group",
    fechaEmision: "2023-04-15",
    fechaEntrega: "2023-04-20",
  },
  {
    id: "OC-103205",
    producto: "Curso de Programación",
    cantidad: 4,
    total: 4 * 359.96,
    informacionRecepcion: "Recepcionado por: Carolina Fernández",
    proveedor: "IntellectJunction Institute",
    fechaEmision: "2023-05-05",
    fechaEntrega: "2023-05-10",
  },
];

/* Funciones genericas */

function pintarTabla(data, table) {
  table.innerHTML = "";
  data.map((item) => {
    const [uno, dos, tres, cuatro, cinco] = Object.keys(item);
    let nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
            <td>${item[uno]}</td>
            <td>${item[dos]}</td>
            <td>${item[tres]}</td>
            <td>${item[cuatro]}</td>
            <td>${item[cinco]}</td>
            <td><button type="button" class="deleteBtn btn btn-outline-danger" data-index-number="${item[uno]}"><i class="fw-bolder fs-5 fa-solid fa-trash-can" ></i></button>
            <button type="button" class="editBtn btn btn-outline-primary" data-index-number="${item[uno]}" disabled><i class="fw-bolder fs-5 fa-regular fa-pen-to-square"></i></button>
            </td>
        `;
    table.appendChild(nuevaFila);
  });
}

function obtenerDatosDesdeLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function guardarDatosEnLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function eliminarElemento(e, deleteBtn, data, key) {
  const trElement = deleteBtn.closest("tr");
  trElement.parentNode.removeChild(trElement);
  data = data.filter((item) => item.id != e.currentTarget.dataset.indexNumber);
  guardarDatosEnLocalStorage(key, data);
  return data;
}

export default {
  proveedoresEjemplo,
  productosEjemplo,
  ordenesEjemplo,
  obtenerDatosDesdeLocalStorage,
  guardarDatosEnLocalStorage,
  pintarTabla,
  eliminarElemento,
};
