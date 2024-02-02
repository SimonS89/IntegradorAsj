package com.asj.integrador.service.impl;

import com.asj.integrador.model.DetalleOrden;
import com.asj.integrador.repository.DetalleOrdenRepository;
import com.asj.integrador.service.DetalleOrdenService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class DetalleOrdenServiceImpl implements DetalleOrdenService {

    private final DetalleOrdenRepository detalleOrdenRepository;

    public DetalleOrdenServiceImpl(DetalleOrdenRepository detalleOrdenRepository) {
        this.detalleOrdenRepository = detalleOrdenRepository;
    }

    @Override
    @Transactional
    public DetalleOrden crear(DetalleOrden detalleOrden) {
        return detalleOrdenRepository.save(detalleOrden);
    }
}
