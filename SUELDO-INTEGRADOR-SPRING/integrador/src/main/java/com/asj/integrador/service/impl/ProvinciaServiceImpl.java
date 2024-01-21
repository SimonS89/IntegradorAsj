package com.asj.integrador.service.impl;

import com.asj.integrador.dto.pais_provincia.DataDTO;
import com.asj.integrador.model.Pais;
import com.asj.integrador.model.Provincia;
import com.asj.integrador.repository.ProvinciaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ProvinciaServiceImpl {

    private final ProvinciaRepository provinciaRepository;
    private final ModelMapper mapper;
    private final WebClient webClient;

    public ProvinciaServiceImpl(ProvinciaRepository provinciaRepository, ModelMapper mapper, WebClient webClient) {
        this.provinciaRepository = provinciaRepository;
        this.mapper = mapper;
        this.webClient = webClient;
    }

    public void crearProvinciasArg(Pais pais) {
        DataDTO data = webClient.get().uri("?campos=id,nombre").retrieve().bodyToMono(DataDTO.class).block();
        data.getProvincias().forEach(p -> {
            Provincia provincia = mapper.map(p, Provincia.class);
            provincia.setPais(pais);
            provinciaRepository.save(provincia);
        });
    }

}
