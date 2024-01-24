package com.asj.integrador.service;

import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.RolUsuario;
import com.asj.integrador.util.Rol;

public interface RolUsuarioService {
    void defaultData();

    RolUsuario buscarPorRol(Rol rol) throws ResourceNotFoundException;
}
