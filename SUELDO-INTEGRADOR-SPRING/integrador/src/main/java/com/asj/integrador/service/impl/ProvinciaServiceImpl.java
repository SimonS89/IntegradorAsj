package com.asj.integrador.service.impl;

import com.asj.integrador.dto.pais_provincia.ProvinciaDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Pais;
import com.asj.integrador.model.Provincia;
import com.asj.integrador.repository.ProvinciaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

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

    public void crearProvincias(Pais pais) {
        List<ProvinciaDTO> provincias = webClient.get().uri("/countries/" + pais.getId() + "/states").retrieve().bodyToFlux(ProvinciaDTO.class).collectList().block();
        provincias.parallelStream().forEach(p -> {
            Provincia provincia = mapper.map(p, Provincia.class);
            provincia.setNombre(p.getName());
            provincia.setPais(pais);
            provinciaRepository.save(provincia);
        });
    }

    public List<Provincia> findByPais(Long paisId) throws ResourceNotFoundException {
        List<Provincia> provinciasEncontradas = provinciaRepository.findByPaisId(paisId);
        if (provinciasEncontradas.isEmpty()) throw new ResourceNotFoundException("No hay paises disponibles");
        return provinciasEncontradas;
    }
}
