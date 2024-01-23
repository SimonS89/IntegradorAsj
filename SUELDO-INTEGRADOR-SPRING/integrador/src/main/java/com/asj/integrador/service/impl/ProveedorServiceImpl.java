package com.asj.integrador.service.impl;

import com.asj.integrador.repository.ProveedorRepository;
import com.asj.integrador.service.ProveedorService;
import org.springframework.stereotype.Service;

@Service
public class ProveedorServiceImpl implements ProveedorService {

    private final ProveedorRepository proveedorRepository;

    public ProveedorServiceImpl(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }
}
