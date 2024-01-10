-- Inserts

use integrador;
insert into paises (nombre) values ('Argentina'),('Uruguay');
insert into provincias (nombre,pais_id) values ('Buenos Aires',1),('Córdoba',1),('Mendoza',1),('Montevideo',2),('Tucumán',1), ('Santa Fe',1),('Ruta 36','Km. 25','4000','San Miguel de Tucumán',5),('Av. Vives','3138','5000','Córdoba Capital',2),('San Martín','21','2000','Rosario',6),('Arzobispo Pardo','1243','5500','Mendoza',3);
insert into tipos_iva (tipo) values ('Consumidor final'),('Exento'),('Responsable inscripto'),('Responsable Monotributo'),('Sujeto no Categorizado'),('Proveedor del Exterior'),('Cliente del Exterior'),('IVA Liberado – Ley Nº 19.640'),('IVA Responsable Inscripto – Agente de Percepcion'),('Pequeño Contribuyente Eventual'),('Monotributista Social'),('Pequeño Contribuyente Eventual Social');
insert into rubros (rubro) values ('Tecnología'),('Alimentación'),('Moda'),('Salud'),('Educación');
insert into categorias (categoria) values ('Tecnología'),('Alimentación'),('Moda'),('Salud'),('Educación');
insert into estados_orden (estado) values ('Entregado'),('Cancelado'),('Pendiente');
insert into domicilios (calle,numero,codigo_postal,localidad,provincia_id) values ('142','1123','1900','La Plata',1),('Estados Unidos','1183','1102','San Telmo',1);
/*insert into personas_contacto (nombre,apellido,email,telefono,puesto) values ('Simón','Sueldo','ssueldo@asjservicios.com','2215578552','Jefe de ventas'),('Beatriz','Bocacini','bbeatriz@gmail.com','2215236879','Encargada de Marketing'),('María', 'Martínez', 'mmartinez@empresa.com', '2233445566', 'Gerente de Marketing'),
('Juan', 'Pérez', 'jperez@empresa.com', '2244556677', 'Analista de Finanzas'),
('Laura', 'López', 'llopez@empresa.com', '2255667788', 'Coordinadora de Recursos Humanos'),
('Carlos', 'Cruz', 'ccruz@empresa.com', '2266778899', 'Desarrollador Senior');*/
insert into categorias (categoria) values('Celulares'),('Tablets'),('Snacks'), ('Pastas'),('Remeras'),('Pantalones'),('Masajeadores'),('Suplementos'),('Cursos'),('Clases particulares');
insert into proveedores (codigo,logo,razon_social,cuit,sitio_web,datos_contacto_id,domicilio_id,tipo_iva_id,rubro_id) values
('PA00132','https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo.png','ByteCraft Solutions','30-12345678-8','http://www.ByteCraftSolutions.com',1,1,1,1),
('PA00134','https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png','FreshBite Delights','30-12345678-9','http://www.FreshBiteDelights.com',2,2,2,2),
('PA09872','https://w7.pngwing.com/pngs/786/126/png-transparent-logo-contracting-photography-logo-symbol.png','VogueHarbor Boutique','30-12345678-0','http://www.VogueHarborBoutique.com',3,3,2,3),
('PA10132','https://w7.pngwing.com/pngs/1008/532/png-transparent-wolf-logo-symbol-thumbnail.png','Revitalize Med Group','30-12345678-1','http://www.RevitalizeMedGroup.com',4,4,2,4),
('PA05132','https://e7.pngegg.com/pngimages/361/627/png-clipart-leaf-logo-green-leaves-green-and-teal-leaf-logo-text-maple-leaf.png','IntellectJunction Institute','30-12345678-2','http://www.IntellectJunctionInstitute.com',5,5,1,5),
('PA00135','https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-tech-logo-png-image_4006440.png','TechSolutions Inc.','30-98765432-1','http://www.TechSolutions.com',6,6,3,1);
insert into productos (sku,imagen,nombre,precio,descripcion,proveedor_id,categoria_id) values 
('SKU-A00132','https://images.unsplash.com/photo-1570891836654','Smartphone X',599,'Descubre la potencia y la elegancia del Smartphone X, el último modelo de tecnología avanzada. Con características innovadoras y un diseño moderno, este teléfono inteligente redefine la experiencia móvil.',1,6),
('SKU-B00221', 'https://images.unsplash.com/photo-1570891836654', 'Tablet Z', 349, 'Descubre la portabilidad y versatilidad de nuestra Tablet Z. Perfecta para entretenimiento y productividad en cualquier lugar.', 1, 7),
('SKU-C00342', 'https://images.unsplash.com/photo-1570891836654', 'Celular Y', 799, 'Experimenta la potencia y elegancia del Celular Y. Con funciones avanzadas y un diseño elegante, este dispositivo redefine tus expectativas móviles.', 1, 6),
('SKU-D00453', 'https://images.unsplash.com/photo-1570891836654', 'Snack Crunchy', 2.99, 'Disfruta de nuestro Snack Crunchy, la combinación perfecta de crujiente y delicioso. Ideal para picar en cualquier momento.', 2, 8),
('SKU-E00564', 'https://images.unsplash.com/photo-1570891836654', 'Pasta Fusilli', 3.49, 'Descubre la auténtica Pasta Fusilli, elaborada con ingredientes de alta calidad. Perfecta para acompañar tus recetas favoritas.', 2, 9),
('SKU-F00675', 'https://images.unsplash.com/photo-1570891836654', 'Snack Saludable', 4.99, 'Nuestro Snack Saludable es una opción deliciosa y nutritiva para tus momentos de hambre. ¡Disfruta sin preocupaciones!', 2, 8),
('SKU-G00786', 'https://images.unsplash.com/photo-1570891836654', 'Remera Casual', 19.99, 'Luce con estilo nuestra Remera Casual, perfecta para cualquier ocasión. Con un diseño moderno y cómodo.', 3, 10),
('SKU-H00897', 'https://images.unsplash.com/photo-1570891836654', 'Pantalón Jeans', 29.99, 'El Pantalón Jeans que estabas buscando. Con un ajuste perfecto y detalles de moda, este pantalón te hará destacar.', 3, 11),
('SKU-I00908', 'https://images.unsplash.com/photo-1570891836654', 'Remera Deportiva', 24.99, 'Maximiza tu rendimiento con nuestra Remera Deportiva. Diseñada para ofrecer comodidad y libertad de movimiento durante tus entrenamientos.', 3, 10),
('SKU-J01019', 'https://images.unsplash.com/photo-1570891836654', 'Masajeador Shiatsu', 69.99, 'Relájate con nuestro Masajeador Shiatsu de última generación. Con funciones avanzadas, brinda una experiencia de masaje excepcional.', 4, 12),
('SKU-K01120', 'https://images.unsplash.com/photo-1570891836654', 'Suplemento Nutricional', 29.99, 'Aumenta tu rendimiento con nuestro Suplemento Nutricional. Formulado con ingredientes de alta calidad para apoyar tu bienestar general.', 4, 13),
('SKU-L01231', 'https://images.unsplash.com/photo-1570891836654', 'Masajeador Portátil', 49.99, 'Lleva la relajación contigo con nuestro Masajeador Portátil. Compacto y potente, ideal para aliviar el estrés en cualquier lugar.', 4, 12),
('SKU-M01342', 'https://images.unsplash.com/photo-1570891836654', 'Curso de Fotografía Básica', 49.99, 'Aprende los fundamentos de la fotografía con nuestro Curso de Fotografía Básica. Perfecto para principiantes que desean mejorar sus habilidades.', 5, 14),
('SKU-N01453', 'https://images.unsplash.com/photo-1570891836654', 'Clases de Guitarra Personalizadas', 29.99, 'Mejora tu técnica y aprende a tocar la guitarra con nuestras Clases de Guitarra Personalizadas. Adaptadas a tus necesidades y habilidades.', 5, 15),
('SKU-O01564', 'https://images.unsplash.com/photo-1570891836654', 'Curso de Desarrollo Web Avanzado', 79.99, 'Amplía tus conocimientos en desarrollo web con nuestro Curso de Desarrollo Web Avanzado. Incluye temas avanzados y proyectos prácticos.', 5, 14),
('SKU-P01675', 'https://images.unsplash.com/photo-1570891836654', 'Tablet Pro', 249.99, 'Descubre la potencia y versatilidad de nuestra Tablet Pro. Perfecta para entretenimiento y productividad en cualquier lugar.', 6, 7),
('SKU-Q01786', 'https://images.unsplash.com/photo-1570891836654', 'Celular Avanzado', 599.99, 'Experimenta la potencia y elegancia del Celular Avanzado. Con funciones de vanguardia y un diseño elegante, este dispositivo redefine tus expectativas móviles.', 6, 6),
('SKU-R01897', 'https://images.unsplash.com/photo-1570891836654', 'Tablet Express', 179.99, 'La Tablet Express te ofrece un rendimiento sólido a un precio accesible. Ideal para tareas diarias y entretenimiento en movimiento.', 6, 7);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-321',2096,'Argus Filch', '2024-01-15',1,3);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (599,1,2,1),(349,2,2,2),(799,1,2,3);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-853',338.89,'Dolores Umbridge', '2024-01-13',2,2);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (2.99,100,3,4),(3.49,10,3,5),(4.99,1,3,6);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-852',2323.89,'Albus Dumbledore', '2024-01-09',3,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (19.99,100,4,7),(29.99,10,4,8),(24.99,1,4,9);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-648',5368.89,'Peter Pettigrew', '2023-11-09','2023-12-20',4,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (69.99,1,5,10),(29.99,10,5,11),(49.99,100,5,12);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-111',1599.7,'Severus Snape', '2023-10-19','2023-10-25',5,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (49.99,10,6,13),(29.99,10,6,14),(79.99,10,6,15);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-222',10299.7,'Belatrix Lestrange', '2023-07-15','2023-08-11',6,2);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (249.99,10,7,16),(599.99,10,7,17),(179.99,10,7,18);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-333',948,'Sirious Black', '2022-06-11','2022-08-11',1,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (599,1,8,1),(349,1,8,2);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-444',12.96,'Harry Potter', '2022-05-11','2022-05-11',2,2);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (2.99,2,9,4),(3.49,2,9,5);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-555',149.94,'Rubeus Hagrid', '2024-01-02','2024-01-08',3,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (19.99,3,10,7),(29.99,3,10,8);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-666',399.92,'Remus Lupin', '2023-01-04','2023-01-08',4,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (69.99,4,11,10),(29.99,4,11,11);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-777',399.99,'Luna Lovegood', '2023-03-04','2023-03-08',5,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (49.99,5,12,13),(29.99,5,12,14);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-888',5099.88,'Neville Longbottom', '2023-02-24','2023-03-09',6,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (249.99,6,13,16),(599.99,6,13,17);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-999',5593,'Draco Malfoy', '2022-02-24','2022-03-09',1,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (799,7,14,3);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-987',39.92,'Ron Weasley', '2023-09-24','2023-10-09',2,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (4.99,8,15,6);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-876',224.91,'Hermione Granger', '2023-03-24','2023-4-09',3,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (24.99,9,16,9);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-765',499.99,'Seamus Finnigan', '2022-11-24','2022-12-01',4,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (49.99,10,17,12);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-654',879.89,'Cedric Diggory', '2023-11-24','2023-12-01',5,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (79.99,11,18,15);
insert into ordenes_compra (num_orden, total, info_recepcion,fecha_emision,fecha_entrega,proveedor_id,estado_orden_id) values ('OR-543',2159.88,'Minerva McGonagall', '2023-12-24','2024-01-02',6,1);
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (179.99,12,19,18);

--Inserts y modificaciones durante el integrador

ALTER TABLE 
  productos 
ADD 
  esta_eliminado BIT DEFAULT 0 NOT NULL;
ALTER TABLE 
  proveedores 
ADD 
  telefono VARCHAR(15) NULL;
UPDATE 
  proveedores 
SET 
  telefono = '3512565850' 
where 
  id = 1;
UPDATE 
  proveedores 
SET 
  telefono = '3512123850' 
where 
  id = 2;
UPDATE 
  proveedores 
SET 
  telefono = '2215515256' 
where 
  id = 3;
UPDATE 
  proveedores 
SET 
  telefono = '2235545256' 
where 
  id = 4;
UPDATE 
  proveedores 
SET 
  telefono = '3515545256' 
where 
  id = 5;
UPDATE 
  proveedores 
SET 
  telefono = '1151554525' 
where 
  id = 6;
ALTER TABLE 
  proveedores 
ADD 
  email VARCHAR(50) NULL;
UPDATE 
  proveedores 
SET 
  email = 'primerProveedor@gmail.com' 
where 
  id = 1;
UPDATE 
  proveedores 
SET 
  email = 'primerProveedor@gmail.com' 
where 
  id = 2;
UPDATE 
  proveedores 
SET 
  email = 'primerProveedor@gmail.com' 
where 
  id = 3;
UPDATE 
  proveedores 
SET 
  email = 'primerProveedor@gmail.com' 
where 
  id = 4;
UPDATE 
  proveedores 
SET 
  email = 'primerProveedor@gmail.com' 
where 
  id = 5;
UPDATE 
  proveedores 
SET 
  email = 'primerProveedor@gmail.com' 
where 
  id = 6;
ALTER TABLE 
  productos ALTER COLUMN imagen VARCHAR(255) NULL;
UPDATE 
  productos 
SET 
  imagen = null 
where 
  id = 6;
insert into ordenes_compra (
  num_orden, total, info_recepcion, 
  fecha_emision, fecha_entrega, proveedor_id, 
  estado_orden_id
) 
values 
  (
    'OR-432', 599, 'Lord Voldemort', '1992-01-10', 
    '1992-01-20', 1, 1
  );
insert into detalles_orden (
  precio, cantidad, orden_compra_id, 
  producto_id
) 
values 
  (599, 1, 20, 1);

-- Consultas 

/*Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.*/
select 
  pr.nombre as nombre_producto, 
  c.categoria as categoria, 
  pv.razon_social as razon_social, 
  pv.codigo as codigo_proveedor 
from 
  productos pr 
  inner join proveedores pv on pr.proveedor_id = pv.id 
  inner join categorias c on pr.categoria_id = c.id;
/*En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".*/
select 
  pr.nombre as nombre_producto, 
  ISNULL(pr.imagen, '-') as producto_imagen, 
  c.categoria as categoria, 
  pv.razon_social as razon_social, 
  pv.codigo as codigo_proveedor 
from 
  productos pr 
  inner join proveedores pv on pr.proveedor_id = pv.id 
  inner join categorias c on pr.categoria_id = c.id;
/*Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.*/
select 
  p.sku, 
  p.imagen, 
  p.nombre, 
  p.precio, 
  p.descripcion, 
  c.categoria 
from 
  productos p 
  inner join categorias c on p.categoria_id = c.id 
where 
  p.id = 2;
/*Listar todo los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.*/
select 
  top 3 pv.codigo, 
  pv.razon_social, 
  pv.cuit, 
  pv.telefono 
from 
  proveedores pv 
  inner join domicilios d on pv.domicilio_id = d.id 
  inner join provincias pr on d.provincia_id = pr.id 
where 
  pv.telefono like '351%' 
  or pr.id = (
    SELECT 
      TOP 1 provincia_id 
    FROM 
      domicilios 
    GROUP BY 
      provincia_id 
    ORDER BY 
      COUNT(provincia_id) DESC
  );
/*Traer un listado de todos los proveedores que no hayan sido eliminados , y ordenados por razon social, codigo proveedor y fecha en que se dió de alta ASC. 
De este listado mostrar los datos que correspondan con su tabla del front.*/
select 
  p.logo, 
  p.codigo, 
  p.razon_social, 
  concat(
    pc.email, ', ', p.telefono, ', ', p.sitio_web
  ) as info_general, 
  concat(pc.apellido, ' ', pc.nombre) as Titular, 
  r.rubro 
from 
  proveedores p 
  inner join personas_contacto pc on p.datos_contacto_id = pc.id 
  inner join rubros r on p.rubro_id = r.id 
where 
  p.esta_eliminado = 0 
order by 
  p.razon_social, 
  p.codigo, 
  p.creado_el;
/*Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.*/
select 
  top 1 p.razon_social, 
  count(oc.id) as Ordenes_por_proveedor, 
  p.codigo, 
  p.logo, 
  p.sitio_web, 
  p.telefono, 
  pc.email, 
  pc.apellido, 
  pc.nombre, 
  pc.puesto 
from 
  proveedores p 
  inner join ordenes_compra oc on p.id = oc.proveedor_id 
  inner join personas_contacto pc on p.datos_contacto_id = pc.id 
group by 
  p.id, 
  p.razon_social, 
  p.codigo, 
  p.logo, 
  p.sitio_web, 
  p.telefono, 
  pc.email, 
  pc.apellido, 
  pc.nombre, 
  pc.puesto, 
  pc.puesto 
order by 
  count(oc.id) desc;
/*Mostrar la fecha emisión, nº de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.*/
select 
  oc.fecha_emision, 
  oc.num_orden, 
  pr.razon_social, 
  pr.codigo as codigo_proveedor, 
  sum(do.cantidad) 
from 
  ordenes_compra oc 
  inner join proveedores pr on pr.id = oc.proveedor_id 
  inner join detalles_orden do on do.orden_compra_id = oc.id 
group by 
  oc.id, 
  oc.fecha_emision, 
  oc.num_orden, 
  pr.razon_social, 
  pr.codigo;
/*En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.*/
select 
  oc.fecha_emision, 
  oc.num_orden, 
  pr.razon_social, 
  pr.codigo as codigo_proveedor, 
  sum(do.cantidad) as cantidad_total, 
  eo.estado 
from 
  ordenes_compra oc 
  inner join proveedores pr on pr.id = oc.proveedor_id 
  inner join detalles_orden do on do.orden_compra_id = oc.id 
  inner join estados_orden eo on eo.id = oc.estado_orden_id 
group by 
  oc.id, 
  oc.fecha_emision, 
  oc.num_orden, 
  pr.razon_social, 
  pr.codigo, 
  eo.estado;
/*Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.*/
select 
  prod.sku, 
  prod.nombre as nombre_producto, 
  dc.cantidad, 
  (dc.cantidad * dc.precio) as Sub_total 
from 
  detalles_orden dc 
  inner join productos prod on prod.id = dc.producto_id 
  inner join ordenes_compra oc on oc.id = dc.orden_compra_id 
  inner join proveedores prov on prov.id = prod.proveedor_id 
where 
  prov.id = 3 
  /*Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 4.*/
UPDATE 
  ordenes_compra 
SET 
  estado_orden_id = 2, 
  actualizado_el = GETDATE() 
WHERE 
  id = 4;
/*Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SÓLO MOSTRAR SENTENCIA)*/
delete from 
  productos 
where 
  id = 1;