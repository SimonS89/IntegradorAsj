package com.asj.integrador.service.impl;

import com.asj.integrador.repository.ProveedorRepository;
import org.springframework.stereotype.Service;

@Service
public class ProveedorServiceImpl {

    private final ProveedorRepository proveedorRepository;

    public ProveedorServiceImpl(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }
}
