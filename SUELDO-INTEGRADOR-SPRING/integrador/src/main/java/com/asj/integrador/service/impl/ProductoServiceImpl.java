package com.asj.integrador.service.impl;

import com.asj.integrador.repository.ProductoRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductoServiceImpl {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }
}
