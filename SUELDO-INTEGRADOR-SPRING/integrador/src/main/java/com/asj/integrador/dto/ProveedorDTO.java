package com.asj.integrador.dto;

import com.asj.integrador.dto.response.DomicilioDTO;
import com.asj.integrador.model.RepresentanteContacto;
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
public class ProveedorDTO {
    private String codigo;
    private String logo;
    private String razonSocial;
    private String telefono;
    private String email;
    private String cuit;
    private String sitioWeb;
    private long tipoIvaId;
    private long rubroId;
    private long provinciaId;
    private long paisId;
    private DomicilioDTO domicilio;
    private RepresentanteContacto representanteContacto;
}
