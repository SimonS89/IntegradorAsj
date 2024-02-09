
insert into domicilios (calle,numero,codigo_postal,localidad,provincia_id) values ('142','1123','1900','La Plata',3656),('Estados Unidos','1183','1102','San Telmo',4880), ('Avenida Vives','3126','5008','Córdoba',3642), ('Bernis','3069','5008','Córdoba',3642);
insert into representantes_contacto (nombre,apellido,email,telefono,rol) values ('Simón','Sueldo','ssueldo@asjservicios.com','2215578552','Jefe de ventas'),('Beatriz','Bocacini','bbeatriz@gmail.com','2215236879','Encargada de Marketing'),('María', 'Martínez', 'mmartinez@empresa.com', '2233445566', 'Gerente de Marketing'),
('Juan', 'Pérez', 'jperez@empresa.com', '2244556677', 'Analista de Finanzas'),
('Laura', 'López', 'llopez@empresa.com', '2255667788', 'Coordinadora de Recursos Humanos'),
('Carlos', 'Cruz', 'ccruz@empresa.com', '2266778899', 'Desarrollador Senior');

insert into proveedores (eliminado, fecha_creacion_registro, email, telefono, codigo,logo,razon_social,cuit,sitio_web,representante_contacto_id,domicilio_id,tipo_iva_id,rubro_id) values
(false, current_date(), 'asociacionnautica@gmail.com', '0351-476998542', 'AN351','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwhWHLqNVYUZs2baq6VCdch_khfFNfP97C57PZR0wBZDzFnXA6SXlZbDx22hrXz2ZQlo&usqp=CAU','Asociación Náutica','30-12345678-8','http://www.asocnautica.com',1,3,1,6),
(false, current_date(), 'almanatural@gmail.com', '0351-452998872', 'AD365','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKDuBzhCfj7IqYePY_Z9kWbixOEPCEUmFjA&usqp=CAU','Alma Natural','30-22349878-7','http://www.almdietetica.com',2,4,2,2),
(false, current_date(), 'fashionstore-santelmo@gmail.com', '011-43620098', 'FS011','https://img.freepik.com/vector-premium/logotipo-tienda-moda-minimalista_278222-2014.jpg','Fashion Store ST','30-69885678-8','http://www.fashionstore.com',3,2,1,3),
(false, current_date(), 'tech-supplies@gmail.com', '0221-4986525', 'TS221','https://re-grip.com/wp-content/uploads/2017/08/Re-Grip-Tech-Shop-logo.jpg','Tech Supplies','30-9534478-8','http://www.techsstore.com',4,1,1,1);

insert into productos (eliminado, fecha_creacion_registro, sku,imagen,nombre,precio,descripcion,proveedor_id,categoria_id) values 
(false, current_date(), 'SKU-N00001','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUzJsdH7Y0LKu7XxjctUM-ss_DoREr8XRCvY8d_xR_AKFazEpJMi0uff6FmCjYmNkJvHg&usqp=CAU','Bolso estanco Bewalk',34000,'Bolso impermeable para proteger tu carga del agua, la arena, el barro y el polvo.',1,6),
(false, current_date(), 'SKU-N00002','https://http2.mlstatic.com/D_NQ_NP_2X_808130-MLU74075322106_012024-F.webp', 'Linterna Spinit Pointmax',11000,'Esta linterna es resistente a situaciones climáticas adversas o a probables derrames de agua sobre ellas. Sus materiales duraderos y la calidad en su composición hacen que sea una gran opción para tener en el hogar.',1,6),
(false, current_date(), 'SKU-A00003','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsXWXnoRWOjgzXz3lQmU1cpXY7SZGzlt8dbQ&usqp=CAU','Hongos de pino',10000,'Hongos de pino x1kg, excelente calidad, origen Chile.',2,7),
(false, current_date(), 'SKU-A00004','https://http2.mlstatic.com/D_NQ_NP_2X_865940-MLU70098625975_062023-F.webp','Almendras',8000,'Almendras peladas calidad premium 1kg.',2,7),
(false, current_date(), 'SKU-T00005','https://mercadonotebooks.com.ar/wp-content/uploads/2023/09/lenovo-3i-1-768x768.webp','Lenovo IdeaPad',500000,'Notebook Lenovo IdeaPad 3 14ITL05, 4GB, 128GB.',4,10),
(false, current_date(), 'SKU-T00006','https://http2.mlstatic.com/D_NQ_NP_614640-MLA72641897396_112023-O.webp','Computadora',800000,'Computadora De Escritorio Completa Intel I3, 16g, 240g, Ver2.0.',4,10);





insert into ordenes_compra (activa, fecha_emision, fecha_entrega, total, fecha_creacion_registro, proveedor_id, numero_orden,info_recepcion) values (true, current_date(), '2024-03-15', 45000,current_date(), 1, 'OR_A0001', 'Argus Filch');
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (34000,1,1,1),(11000,1,1,2);
insert into ordenes_compra (activa, fecha_emision, fecha_entrega, total, fecha_creacion_registro, proveedor_id, numero_orden,info_recepcion) values (true, current_date(), '2024-03-02', 46000,current_date(), 2, 'OR_N0021', 'Harry Potter');
insert into detalles_orden (precio, cantidad, orden_compra_id,producto_id) values (8000,2,2,4),(10000,3,2,3);
