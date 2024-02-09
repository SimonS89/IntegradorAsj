package com.asj.integrador.dto.response;

import com.asj.integrador.model.RolUsuario;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AutenticacionUsuarioResponseDTO {
    private Long id;
    private String username;
    private String email;
    private String token;
    private List<RolUsuario> roles;
}
