package com.asj.integrador.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductoResponseDTO {
    private Long id;
    private String sku;
    private String imagen;
    private String nombre;
    private double precio;
    private String descripcion;
    private ProveedorProductoResponseDTO proveedor;
    private CategoriaResponseDTO categoria;
}
