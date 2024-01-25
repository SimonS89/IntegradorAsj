package com.asj.integrador.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DomicilioDTO {
    private Long id;
    private String calle;
    private String numero;
    private String codigoPostal;
    private String localidad;
}
