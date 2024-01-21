package com.asj.integrador.service.impl;

import com.asj.integrador.dto.request.RubroRequestDTO;
import com.asj.integrador.dto.response.RubroResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Rubro;
import com.asj.integrador.repository.RubroRepository;
import com.asj.integrador.service.RubroService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RubroServiceImpl implements RubroService {

    private final RubroRepository rubroRepository;
    private final ModelMapper mapper;
    private final Logger logger = LoggerFactory.getLogger(CategoriaServiceImpl.class);

    public RubroServiceImpl(RubroRepository rubroRepository, ModelMapper mapper) {
        this.rubroRepository = rubroRepository;
        this.mapper = mapper;
    }

    @Override
    public RubroResponseDTO create(RubroRequestDTO rubroRequestDTO) throws AlreadyExistsException {
        Optional<Rubro> rubroEncontrado = rubroRepository.findByRubro(rubroRequestDTO.getRubro());
        if (rubroEncontrado.isPresent()) throw new AlreadyExistsException("Rubro existente");
        Rubro rubro = mapper.map(rubroRequestDTO, Rubro.class);
        return mapper.map(rubroRepository.save(rubro), RubroResponseDTO.class);
    }

    @Override
    public RubroResponseDTO findById(Long id) throws ResourceNotFoundException {
        return mapper.map(getRubroIfExists(id), RubroResponseDTO.class);
    }

    @Override
    public List<RubroResponseDTO> findAll() throws ResourceNotFoundException {
        List<Rubro> rubrosEncontrados = rubroRepository.findAll();
        if (rubrosEncontrados.isEmpty()) throw new ResourceNotFoundException("No hay rubros disponibles");
        return rubrosEncontrados.stream().map(rubro -> mapper.map(rubro, RubroResponseDTO.class)).toList();
    }

    @Override
    public RubroResponseDTO update(long id, RubroRequestDTO rubroRequestDTO) throws ResourceNotFoundException {
        getRubroIfExists(id);
        Rubro rubroActualizado = mapper.map(rubroRequestDTO, Rubro.class);
        rubroActualizado.setId(id);
        return mapper.map(rubroRepository.save(rubroActualizado), RubroResponseDTO.class);
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        getRubroIfExists(id);
        rubroRepository.deleteById(id);
    }

    @Override
    public void softDelete(Long id) throws ResourceNotFoundException {
        Rubro rubro = getRubroIfExists(id);
        rubro.setEliminado(true);
        rubroRepository.save(rubro);
    }

    private Rubro getRubroIfExists(Long id) throws ResourceNotFoundException {
        return rubroRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Rubro no encontrado"));
    }
}
