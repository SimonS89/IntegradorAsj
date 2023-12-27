const proveedoresEjemplo = [
  {
    id: 'ID-A00132',
    logo: 'https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo.png',
    razonSocial: 'ByteCraft Solutions',
    cuit: '30-12345678-8',
    tipoIva: 'Responsable Inscripto',
    rubro: 'Tecnología',
    sitioWeb: 'http://www.ByteCraftSolutions.com',
    domicilio: {
      direccion: 'Calle A Nº 123',
      codigoPostal: 'CP12345',
      localidad: 'La Plata',
      provincia: 'Buenos Aires',
      pais: 'Argentina',
    },
    datosContacto: {
      nombreCompleto: 'Juan Pérez',
      telefono: '555-1234',
      email: 'juan.perez@empresaA.com',
      rol: 'Representante de Ventas',
    },
  },
  {
    id: 'ID-A00134',
    logo: 'https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png',
    razonSocial: 'FreshBite Delights',
    cuit: '30-12345678-9',
    tipoIva: 'Monotributista',
    rubro: 'Alimentación',
    sitioWeb: 'http://www.FreshBiteDelights.com',
    domicilio: {
      direccion: 'Avenida B Nº 456',
      codigoPostal: 'CP54321',
      localidad: 'Berazategui',
      provincia: 'Buenos Aires',
      pais: 'Argentina',
    },
    datosContacto: {
      nombreCompleto: 'Ana García',
      telefono: '555-5678',
      email: 'ana.garcia@empresaB.com',
      rol: 'Especialista en Marketing Digital',
    },
  },
  {
    id: 'ID-A09872',
    logo: 'https://w7.pngwing.com/pngs/786/126/png-transparent-logo-contracting-photography-logo-symbol.png',
    razonSocial: 'VogueHarbor Boutique',
    cuit: '30-12345678-0',
    tipoIva: 'Responsable Inscripto',
    rubro: 'Moda',
    sitioWeb: 'http://www.VogueHarborBoutique.com',
    domicilio: {
      direccion: 'Calle C Nº 789',
      codigoPostal: 'CP67890',
      localidad: 'Cordoba',
      provincia: 'Cordoba',
      pais: 'Argentina',
    },
    datosContacto: {
      nombreCompleto: 'Martín López',
      telefono: '555-9876',
      email: 'martin.lopez@empresaC.com',
      rol: 'Asistente de Servicio al Cliente',
    },
  },
  {
    id: 'ID-A10132',
    logo: 'https://w7.pngwing.com/pngs/1008/532/png-transparent-wolf-logo-symbol-thumbnail.png',
    razonSocial: 'Revitalize Med Group',
    cuit: '30-12345678-1',
    tipoIva: 'Exento',
    rubro: 'Salud',
    sitioWeb: 'http://www.RevitalizeMedGroup.com',
    domicilio: {
      direccion: 'Avenida D Nº 1011',
      codigoPostal: 'CP101112',
      localidad: 'Berisso',
      provincia: 'Buenos Aires',
      pais: 'Argentina',
    },
    datosContacto: {
      nombreCompleto: 'Laura Rodríguez',
      telefono: '555-1111',
      email: 'laura.rodriguez@empresaD.com',
      rol: 'Coordinador de Logística',
    },
  },
  {
    id: 'ID-A05132',
    logo: 'https://e7.pngegg.com/pngimages/361/627/png-clipart-leaf-logo-green-leaves-green-and-teal-leaf-logo-text-maple-leaf.png',
    razonSocial: 'IntellectJunction Institute',
    cuit: '30-12345678-2',
    tipoIva: 'Responsable Inscripto',
    rubro: 'Educación',
    sitioWeb: 'http://www.IntellectJunctionInstitute.com',
    domicilio: {
      direccion: 'Calle E Nº 1213',
      codigoPostal: 'CP121314',
      localidad: 'Ensenada',
      provincia: 'Buenos Aires',
      pais: 'Argentina',
    },
    datosContacto: {
      nombreCompleto: 'Carlos Pérez',
      telefono: '555-1212',
      email: 'carlos.perez@empresaE.com',
      rol: 'Analista de Datos Comerciales',
    },
  },
];

const productosEjemplo = [
  {
    id: 'SKU-A00132',
    imagen:
      'https://images.unsplash.com/photo-1570891836654-d4961a7b6929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2VsbHBob25lfGVufDB8MHwwfHx8Mg%3D%3D',
    nombre: 'Smartphone X',
    precio: 599.99,
    descripcion: 'Telefono inteligente de ultima generacion',
    categoria: 'Electrónica',
    proveedor: 'ByteCraft Solutions',
  },
  {
    id: 'SKU-B00132',
    imagen:
      'https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2llc3xlbnwwfDB8MHx8fDI%3D',
    nombre: 'Pack de Galletas',
    precio: 12.99,
    descripcion: 'Variado pack de galletas para toda la familia',
    categoria: 'Alimentos',
    proveedor: 'FreshBite Delights',
  },
  {
    id: 'SKU-C00111',
    imagen:
      'https://images.unsplash.com/photo-1519743670471-034311358429?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlZ2FudCUyMHNoaXJ0fGVufDB8MHwwfHx8Mg%3D%3D',
    nombre: 'Camisa Elegante',
    precio: 49.99,
    descripcion: 'Camisa de alta calidad para ocasiones especiales',
    categoria: 'Ropa',
    proveedor: 'VogueHarbor Boutique',
  },
  {
    id: 'SKU-D00143',
    imagen:
      'https://images.unsplash.com/photo-1563260324-5ebeedc8af7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zmlyc3QlMjBhaWQlMjBraXR8ZW58MHwwfDB8fHwy',
    nombre: 'Kit de Primeros Auxilios',
    precio: 29.99,
    descripcion: 'Kit esencial para emergencias médicas',
    categoria: 'Salud',
    proveedor: 'Revitalize Med Group',
  },
  {
    id: 'SKU-E00551',
    imagen:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZ3JhbW1pbmclMjBjb3Vyc2V8ZW58MHwwfDB8fHwy',
    nombre: 'Curso de Programación',
    precio: 89.99,
    descripcion: 'Curso online para aprender programación',
    categoria: 'Educación',
    proveedor: 'IntellectJunction Institute',
  },
];

const ordenesEjemplo = [
  {
    id: 'OC-104101',
    total: 1799.97,
    informacionRecepcion: 'Recepcionado por: Marta Sánchez',
    fechaEntrega: '2023-01-15',
    fechaEmision: '2023-01-10',
    productos: [
      {
        id: 'SKU-A00132',
        imagen:
          'https://images.unsplash.com/photo-1570891836654-d4961a7b6929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2VsbHBob25lfGVufDB8MHwwfHx8Mg%3D%3D',
        nombre: 'Smartphone X',
        precio: 599.99,
        descripcion: 'Telefono inteligente de ultima generacion',
        categoria: 'Electrónica',
        proveedor: 'ByteCraft Solutions',
        cantidad: 3,
      },
    ],
    isActive: true,
  },
  {
    id: 'OC-158002',
    total: 64.95,
    informacionRecepcion: 'Recepcionado por: Daniel González',
    fechaEmision: '2023-02-05',
    fechaEntrega: '2023-02-10',
    productos: [
      {
        id: 'SKU-B00132',
        imagen:
          'https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29va2llc3xlbnwwfDB8MHx8fDI%3D',
        nombre: 'Pack de Galletas',
        precio: 12.99,
        descripcion: 'Variado pack de galletas para toda la familia',
        categoria: 'Alimentos',
        proveedor: 'FreshBite Delights',
        cantidad: 5,
      },
    ],
    isActive: true,
  },
  {
    id: 'OC-169003',
    total: 99.98,
    informacionRecepcion: 'Recepcionado por: Laura Rodríguez',
    fechaEmision: '2023-03-20',
    fechaEntrega: '2023-03-25',
    productos: [
      {
        id: 'SKU-C00111',
        imagen:
          'https://images.unsplash.com/photo-1519743670471-034311358429?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlZ2FudCUyMHNoaXJ0fGVufDB8MHwwfHx8Mg%3D%3D',
        nombre: 'Camisa Elegante',
        precio: 49.99,
        descripcion: 'Camisa de alta calidad para ocasiones especiales',
        categoria: 'Ropa',
        proveedor: 'VogueHarbor Boutique',
        cantidad: 2,
      },
    ],
    isActive: true,
  },
  {
    id: 'OC-100454',
    total: 29.99,
    informacionRecepcion: 'Recepcionado por: Alejandro Martínez',
    fechaEmision: '2023-04-15',
    fechaEntrega: '2023-04-20',
    productos: [
      {
        id: 'SKU-D00143',
        imagen:
          'https://images.unsplash.com/photo-1563260324-5ebeedc8af7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zmlyc3QlMjBhaWQlMjBraXR8ZW58MHwwfDB8fHwy',
        nombre: 'Kit de Primeros Auxilios',
        precio: 29.99,
        descripcion: 'Kit esencial para emergencias médicas',
        categoria: 'Salud',
        proveedor: 'Revitalize Med Group',
        cantidad: 1,
      },
    ],
    isActive: true,
  },
  {
    id: 'OC-103205',
    total: 4 * 359.96,
    informacionRecepcion: 'Recepcionado por: Carolina Fernández',
    fechaEmision: '2023-05-05',
    fechaEntrega: '2023-05-10',
    productos: [
      {
        id: 'SKU-E00551',
        imagen:
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZ3JhbW1pbmclMjBjb3Vyc2V8ZW58MHwwfDB8fHwy',
        nombre: 'Curso de Programación',
        precio: 89.99,
        descripcion: 'Curso online para aprender programación',
        categoria: 'Educación',
        proveedor: 'IntellectJunction Institute',
        cantidad: 4,
      },
    ],
    isActive: true,
  },
];

export { proveedoresEjemplo, productosEjemplo, ordenesEjemplo };
