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
public class ProveedorProductoResponseDTO {
    private long id;
    private String codigo;
    private String logo;
    private String razonSocial;
    private String telefono;
    private String email;
    private String cuit;
    private String sitioWeb;
}
