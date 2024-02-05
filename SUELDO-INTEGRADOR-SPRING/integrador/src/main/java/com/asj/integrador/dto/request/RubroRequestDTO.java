package com.asj.integrador.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
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
public class RubroRequestDTO {

    @NotBlank(message = "El campo de rubro no puede estar vacio")
    @Size(min=3 , message = "Ingrese al menos 3 caracteres.")
    private String rubro;
}
