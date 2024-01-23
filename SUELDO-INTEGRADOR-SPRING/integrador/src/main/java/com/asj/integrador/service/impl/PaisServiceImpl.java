package com.asj.integrador.service.impl;

import com.asj.integrador.dto.pais_provincia_api.PaisDTO;
import com.asj.integrador.dto.response.PaisResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Pais;
import com.asj.integrador.repository.PaisRepository;
import com.asj.integrador.service.PaisService;
import com.asj.integrador.service.ProvinciaService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;

@Service
public class PaisServiceImpl implements PaisService {

    private final PaisRepository paisRepository;
    private final ModelMapper mapper;
    private final ProvinciaService provinciaService;
    private final WebClient webClient;

    public PaisServiceImpl(PaisRepository paisRepository, ModelMapper mapper, ProvinciaService provinciaService, WebClient webClient) {
        this.paisRepository = paisRepository;
        this.mapper = mapper;
        this.provinciaService = provinciaService;
        this.webClient = webClient;
    }

    @Override
    public void createPaises() {
        if (paisRepository.count() == 0) {
            List<Integer> idPaises = Arrays.asList(11, 235, 31, 172, 44);
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

    @Override
    public List<PaisResponseDTO> findAll() throws ResourceNotFoundException {
        List<Pais> paisesEncontrados = paisRepository.findAll();
        if (paisesEncontrados.isEmpty()) throw new ResourceNotFoundException("No hay paises disponibles");
        return paisRepository.findAll().stream().map(pais -> mapper.map(pais, PaisResponseDTO.class)).toList();
    }

}
