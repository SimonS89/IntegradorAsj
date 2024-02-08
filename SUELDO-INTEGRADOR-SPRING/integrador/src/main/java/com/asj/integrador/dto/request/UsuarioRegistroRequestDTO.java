package com.asj.integrador.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Email;
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
public class UsuarioRegistroRequestDTO {
    @NotBlank(message = "Ingrese un nombre de usuario.")
    @Size(min = 3, message = "El nombre de usuario debe tener al menos 3 caracteres.")
    private String username;
    @NotBlank(message = "Ingrese una contraseña.")
    @Size(min = 3, message = "La contraseña debe tener al menos 3 caracteres.")
    private String password;
    @NotBlank(message = "Reingrese la contraseña.")
    private String rePassword;
    @Email
    @NotBlank(message = "Ingrese un email.")
    private String email;
}
