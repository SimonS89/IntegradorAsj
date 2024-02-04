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
    @Pattern(regexp = "[a-zA-Z0-9]+", message = "Ingrese al menos 4 caracteres.")
    private String codigo;
    @NotBlank
    @Pattern(regexp = "^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]", message = "Formato URL inválido.")
    private String logo;
    @NotBlank
    private String razonSocial;
    @NotBlank
    @Pattern(regexp = "^[0-9\\-]+$", message = "Ingrese solo números.")
    private String telefono;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Pattern(regexp = "\\d{2}-\\d{8}-\\d{1}", message = "Formato de CUIT inválido.")
    private String cuit;
    @NotBlank
    @Pattern(regexp = "https?://.+", message = "Formato URL inválido.")
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
