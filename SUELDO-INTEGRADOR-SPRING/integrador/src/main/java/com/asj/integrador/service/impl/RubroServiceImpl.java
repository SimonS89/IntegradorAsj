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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class RubroServiceImpl implements RubroService {

    private final RubroRepository rubroRepository;
    private final ModelMapper mapper;
    private final Logger logger = LoggerFactory.getLogger(RubroServiceImpl.class);

    public RubroServiceImpl(RubroRepository rubroRepository, ModelMapper mapper) {
        this.rubroRepository = rubroRepository;
        this.mapper = mapper;
    }

    @Override
    public RubroResponseDTO crear(RubroRequestDTO rubroRequestDTO) throws AlreadyExistsException {
        Optional<Rubro> rubroEncontrado = rubroRepository.findByRubroIgnoreCase(rubroRequestDTO.getRubro());
        if (rubroEncontrado.isPresent()) {
            if (!rubroEncontrado.get().isEliminado()) throw new AlreadyExistsException("Rubro existente");
            else {
                Rubro rubro = rubroEncontrado.get();
                rubro.setEliminado(false);
                return mapper.map(rubroRepository.save(rubro), RubroResponseDTO.class);
            }
        }
        Rubro rubro = mapper.map(rubroRequestDTO, Rubro.class);
        return mapper.map(rubroRepository.save(rubro), RubroResponseDTO.class);
    }

    @Override
    public RubroResponseDTO buscarPorId(Long id) throws ResourceNotFoundException {
        return mapper.map(obtenerRubroSiExiste(id), RubroResponseDTO.class);
    }

    @Override
    public Rubro buscarPorIdInterno(long id) throws ResourceNotFoundException {
        return rubroRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Rubro no encontrado"));
    }

    @Override
    public List<RubroResponseDTO> listarTodo() throws ResourceNotFoundException {
        List<Rubro> rubrosEncontrados = rubroRepository.findAll();
        if (rubrosEncontrados.isEmpty()) throw new ResourceNotFoundException("No hay rubros disponibles");
        return rubrosEncontrados.stream().map(rubro -> mapper.map(rubro, RubroResponseDTO.class)).toList();
    }

    @Override
    public List<RubroResponseDTO> listarRubrosFiltrados(boolean eliminados) throws ResourceNotFoundException {
        List<Rubro> rubros = rubroRepository.findByEliminado(eliminados);
        if (rubros.isEmpty()) throw new ResourceNotFoundException("No hay rubros.");
        return rubros.stream().map(rubro -> mapper.map(rubro, RubroResponseDTO.class)).toList();
    }

    @Override
    public RubroResponseDTO actualizar(long id, RubroRequestDTO rubroRequestDTO) throws ResourceNotFoundException, AlreadyExistsException {
        obtenerRubroSiExiste(id);
        Optional<Rubro> rubroEncontrado = rubroRepository.findByRubroIgnoreCase(rubroRequestDTO.getRubro());
        if(rubroEncontrado.isPresent())throw new AlreadyExistsException("Rubro existente");
        Rubro rubroActualizado = mapper.map(rubroRequestDTO, Rubro.class);
        rubroActualizado.setId(id);
        return mapper.map(rubroRepository.save(rubroActualizado), RubroResponseDTO.class);
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        obtenerRubroSiExiste(id);
        rubroRepository.deleteById(id);
    }

    @Override
    public void eliminadoLogico(Long id) throws ResourceNotFoundException, AlreadyExistsException {
        Rubro rubro = obtenerRubroSiExiste(id);
        if (rubroRepository.countProveedoresByRubroId(id) > 0)
            throw new AlreadyExistsException("El rubro tiene proveedores asociados.");
        rubro.setEliminado(!rubro.isEliminado());
        rubroRepository.save(rubro);
    }

    private Rubro obtenerRubroSiExiste(Long id) throws ResourceNotFoundException {
        return rubroRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Rubro no encontrado"));
    }

    @Override
    public void defaultData() {
        if (rubroRepository.count() == 0) {
            List<String> rubros = new ArrayList<>(Arrays.asList("Tecnología", "Alimentación", "Moda", "Salud", "Educación","Deportes"));
            if (rubroRepository.count() == 0) rubroRepository.saveAll(rubros.stream().map(Rubro::new).toList());
        }
    }
}
