package com.asj.integrador.dto;

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
public class ProductoDTO {
    private String sku;
    private String imagen;
    private String nombre;
    private double precio;
    private String descripcion;
    private long categoriaId;
    private long proveedorId;
}
