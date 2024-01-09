use integrador;
CREATE TABLE paises(
    id BIGINT PRIMARY key NOT NULL IDENTITY(1,1),
    nombre VARCHAR(50)  NOT NULL,
);

CREATE TABLE provincias (
    id BIGINT primary key NOT NULL IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL,
    pais_id BIGINT NOT NULL,
    FOREIGN KEY (pais_id) REFERENCES paises (id)
);

CREATE TABLE domicilios(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    calle VARCHAR(50)  NOT NULL,
    numero VARCHAR(50)  NOT NULL,
	codigo_postal VARCHAR(50)  NOT NULL,
	localidad VARCHAR(50)  NOT NULL,
    provincia_id BIGINT NOT NULL,
    FOREIGN KEY (provincia_id) REFERENCES provincias (id)
);

CREATE TABLE categorias(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    categoria VARCHAR(50) NOT NULL,
    creado_el DATETIME DEFAULT GETDATE() NOT NULL,
    actualizado_el DATETIME NULL
);

CREATE TABLE rubros(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    rubro VARCHAR(50) NOT NULL
);

CREATE TABLE estados_orden(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    estado VARCHAR(50) NOT NULL
);

CREATE TABLE tipos_iva(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE personas_contacto(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    puesto VARCHAR(50) NOT NULL
);

CREATE TABLE proveedores(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    codigo VARCHAR(50) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    razon_social VARCHAR(100) NOT NULL,
    cuit VARCHAR(20) NOT NULL,
    sitio_web VARCHAR(255) NOT NULL,
    creado_el DATETIME DEFAULT GETDATE() NOT NULL,
    actualizado_el DATETIME NULL,
    datos_contacto_id BIGINT NOT NULL,
    domicilio_id BIGINT NOT NULL,
    tipo_iva_id BIGINT NOT NULL,
    rubro_id BIGINT NOT NULL,
	FOREIGN KEY (datos_contacto_id) REFERENCES personas_contacto (id),
	FOREIGN KEY (domicilio_id) REFERENCES domicilios (id),
	FOREIGN KEY (tipo_iva_id) REFERENCES tipos_iva (id),
	FOREIGN KEY (rubro_id) REFERENCES rubros (id)
);

CREATE TABLE productos(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    sku VARCHAR(50) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    precio FLOAT NOT NULL,
    descripcion VARCHAR(1024) NOT NULL,
    creado_el DATETIME DEFAULT GETDATE() NOT NULL,
    actualizado_el DATETIME NULL,
    proveedor_id BIGINT NOT NULL,
    categoria_id BIGINT NOT NULL,
	FOREIGN KEY (proveedor_id) REFERENCES proveedores (id),
	FOREIGN KEY (categoria_id) REFERENCES categorias (id),
);

CREATE TABLE ordenes_compra(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    num_orden VARCHAR(50) NOT NULL,
    total FLOAT NOT NULL,
    info_recepcion VARCHAR(255) NOT NULL,
    info_adicional VARCHAR(255) NOT NULL,
    fecha_emision DATETIME DEFAULT GETDATE() NOT NULL,
    fecha_entrega DATETIME NOT NULL,
    creado_el DATETIME DEFAULT GETDATE() NOT NULL,
    actualizado_el DATETIME NULL,
    proveedor_id BIGINT NOT NULL,
    estado_orden_id BIGINT NOT NULL,
	FOREIGN KEY (proveedor_id) REFERENCES proveedores (id),
	FOREIGN KEY (estado_orden_id) REFERENCES estados_orden (id)
);


CREATE TABLE detalles_orden(
    id BIGINT PRIMARY KEY NOT NULL IDENTITY(1,1),
    precio FLOAT NOT NULL,
    cantidad INT NOT NULL,
    orden_compra_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
	FOREIGN KEY (orden_compra_id) REFERENCES ordenes_compra (id),
	FOREIGN KEY (producto_id) REFERENCES productos (id)
);