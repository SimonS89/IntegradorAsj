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
    private final ModelMapper mapper;

    public DetalleOrdenServiceImpl(DetalleOrdenRepository detalleOrdenRepository, ModelMapper mapper) {
        this.detalleOrdenRepository = detalleOrdenRepository;
        this.mapper = mapper;
    }

    @Override
    @Transactional
    public DetalleOrden crear(DetalleOrden detalleOrden){
        return detalleOrdenRepository.save(detalleOrden);
    }
}
