package com.asj.integrador.service.impl;

import com.asj.integrador.dto.pais_provincia_api.ProvinciaDTO;
import com.asj.integrador.dto.response.ProvinciaResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Pais;
import com.asj.integrador.model.Provincia;
import com.asj.integrador.repository.ProvinciaRepository;
import com.asj.integrador.service.ProvinciaService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class ProvinciaServiceImpl implements ProvinciaService {

    private final ProvinciaRepository provinciaRepository;
    private final ModelMapper mapper;
    private final WebClient webClient;

    public ProvinciaServiceImpl(ProvinciaRepository provinciaRepository, ModelMapper mapper, WebClient webClient) {
        this.provinciaRepository = provinciaRepository;
        this.mapper = mapper;
        this.webClient = webClient;
    }

    @Override
    public void crearProvincias(Pais pais) {
        List<ProvinciaDTO> provincias = webClient.get().uri("/countries/" + pais.getId() + "/states").retrieve().bodyToFlux(ProvinciaDTO.class).collectList().block();
        provincias.parallelStream().forEach(p -> {
            Provincia provincia = mapper.map(p, Provincia.class);
            provincia.setNombre(p.getName());
            provincia.setPais(pais);
            provinciaRepository.save(provincia);
        });
    }

    @Override
    public List<ProvinciaResponseDTO> buscarPorPais(Long paisId) throws ResourceNotFoundException {
        List<Provincia> provinciasEncontradas = provinciaRepository.findByPaisId(paisId);
        if (provinciasEncontradas.isEmpty()) throw new ResourceNotFoundException("No hay paises disponibles");
        return provinciasEncontradas.stream().map(prov->mapper.map(prov, ProvinciaResponseDTO.class)).toList();
    }

    @Override
    public Provincia buscarPorId(Long id) throws ResourceNotFoundException {
        return provinciaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Provincia no encontrada"));
    }
}
