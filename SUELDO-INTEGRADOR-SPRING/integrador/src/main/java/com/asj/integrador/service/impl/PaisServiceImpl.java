package com.asj.integrador.service.impl;

import com.asj.integrador.dto.pais_provincia.PaisDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Pais;
import com.asj.integrador.repository.PaisRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;

@Service
public class PaisServiceImpl {

    private final PaisRepository paisRepository;
    private final ModelMapper mapper;
    private final ProvinciaServiceImpl provinciaService;
    private final WebClient webClient;

    public PaisServiceImpl(PaisRepository paisRepository, ModelMapper mapper, ProvinciaServiceImpl provinciaService, WebClient webClient) {
        this.paisRepository = paisRepository;
        this.mapper = mapper;
        this.provinciaService = provinciaService;
        this.webClient = webClient;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Order(1)
    private void createPaises() {
        List<Pais> paisesEncontrados = paisRepository.findAll();
        List<Integer> idPaises = Arrays.asList(11, 235, 31, 172, 44);
        if (paisesEncontrados.isEmpty()) {
            List<PaisDTO> paises = webClient.get().uri("/countries").retrieve().bodyToFlux(PaisDTO.class).collectList().block();
            paises.parallelStream().forEach(p -> {
                if (idPaises.contains((int) p.getId())) {
                    Pais paisEncontrado = mapper.map(p, Pais.class);
                    paisEncontrado.setNombre(p.getName());
                    provinciaService.crearProvincias(paisRepository.save(paisEncontrado));
                }
            });
        }
    }

    private List<Pais> findAll() throws ResourceNotFoundException {
        List<Pais> paisesEncontrados = paisRepository.findAll();
        if(paisesEncontrados.isEmpty())throw new ResourceNotFoundException("No hay paises disponibles");
        return paisRepository.findAll();
    }

}
