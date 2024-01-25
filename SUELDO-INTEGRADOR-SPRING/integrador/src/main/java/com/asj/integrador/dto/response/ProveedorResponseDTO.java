package com.asj.integrador.dto.response;

import com.asj.integrador.model.Domicilio;
import com.asj.integrador.model.RepresentanteContacto;
import com.asj.integrador.model.TipoIva;
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
public class ProveedorResponseDTO {
    private Long id;
    private String codigo;
    private String logo;
    private String razonSocial;
    private String telefono;
    private String email;
    private String cuit;
    private String sitioWeb;
    private TipoIva tipoIva;
    private RubroResponseDTO rubro;
    private Domicilio domicilio;
    private RepresentanteContacto representanteContacto;
}
