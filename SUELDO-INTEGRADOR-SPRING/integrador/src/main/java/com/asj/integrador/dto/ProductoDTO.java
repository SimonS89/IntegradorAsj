package com.asj.integrador.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
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

    @NotBlank
    private String sku;
    @NotBlank
    private String imagen;
    @NotBlank
    @Size(min = 5, message = "El nombre debe tener al menos 5 caracteres.")
    private String nombre;
    @Positive
    private double precio;
    @NotBlank
    private String descripcion;
    @Positive
    private long categoriaId;
    @Positive
    private long proveedorId;
}
