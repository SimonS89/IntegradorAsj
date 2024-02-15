package com.asj.integrador.dto;

import com.asj.integrador.dto.response.DomicilioDTO;
import com.asj.integrador.model.RepresentanteContacto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
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
    @NotBlank
    private String codigo;
    @NotBlank
    private String logo;
    @NotBlank
    private String razonSocial;
    @NotBlank
    private String telefono;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String cuit;
    @NotBlank
    private String sitioWeb;
    @Positive
    private long tipoIvaId;
    @Positive
    private long rubroId;
    @Positive
    private long provinciaId;
    @Positive
    private long paisId;
    @Valid
    private DomicilioDTO domicilio;
    private RepresentanteContacto representanteContacto;
}
