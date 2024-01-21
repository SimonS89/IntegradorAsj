package com.asj.integrador.service.impl;

import com.asj.integrador.repository.OrdenCompraRepository;
import org.springframework.stereotype.Service;

@Service
public class OrdenCompraServiceImpl {

    private final OrdenCompraRepository ordenCompraRepository;

    public OrdenCompraServiceImpl(OrdenCompraRepository ordenCompraRepository) {
        this.ordenCompraRepository = ordenCompraRepository;
    }
}
