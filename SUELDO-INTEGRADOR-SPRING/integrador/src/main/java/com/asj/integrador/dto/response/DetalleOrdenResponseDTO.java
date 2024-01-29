package com.asj.integrador.dto.response;

import com.asj.integrador.dto.ProductoDTO;
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
public class DetalleOrdenResponseDTO {
    private long id;
    private Double precio;
    private int cantidad;
    private ProductoDTO producto;
}
