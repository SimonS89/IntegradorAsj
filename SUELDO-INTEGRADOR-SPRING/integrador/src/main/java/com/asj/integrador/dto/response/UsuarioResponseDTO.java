package com.asj.integrador.dto.response;

import com.asj.integrador.model.RolUsuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResponseDTO {
    private Long id;
    private String username;
    private String email;
    private List<RolUsuario> roles;
}
