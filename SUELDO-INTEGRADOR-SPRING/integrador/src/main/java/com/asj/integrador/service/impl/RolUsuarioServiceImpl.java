package com.asj.integrador.service.impl;

import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.RolUsuario;
import com.asj.integrador.repository.RolUsuarioRepository;
import com.asj.integrador.service.RolUsuarioService;
import com.asj.integrador.util.Rol;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class RolUsuarioServiceImpl implements RolUsuarioService {

    private final RolUsuarioRepository rolRepository;

    public RolUsuarioServiceImpl(RolUsuarioRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @Override
    public void defaultData() {
        if (rolRepository.count() == 0) {
            Arrays.stream(Rol.values()).forEach(rol -> rolRepository.save(new RolUsuario(rol)));
        }
    }

    @Override
    public RolUsuario buscarPorRol(Rol rol) throws ResourceNotFoundException {
        return rolRepository.findByRol(rol).orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));
    }
}
