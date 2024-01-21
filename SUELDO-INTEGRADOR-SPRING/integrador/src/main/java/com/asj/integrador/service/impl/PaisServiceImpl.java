package com.asj.integrador.service.impl;

import com.asj.integrador.model.Pais;
import com.asj.integrador.repository.PaisRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

@Service
public class PaisServiceImpl {

    private final PaisRepository paisRepository;
    private final ModelMapper mapper;
    private final ProvinciaServiceImpl provinciaService;

    public PaisServiceImpl(PaisRepository paisRepository, ModelMapper mapper, ProvinciaServiceImpl provinciaService) {
        this.paisRepository = paisRepository;
        this.mapper = mapper;
        this.provinciaService = provinciaService;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Order(1)
    private void create() {
        Pais pais = new Pais();
        pais.setNombre("Argentina");
        provinciaService.crearProvinciasArg(paisRepository.save(pais));
    }

    
}
