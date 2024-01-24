package com.asj.integrador.service.impl;

import com.asj.integrador.dto.response.PaisResponseDTO;
import com.asj.integrador.dto.response.ProvinciaResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.TipoIva;
import com.asj.integrador.repository.ProveedorRepository;
import com.asj.integrador.service.PaisService;
import com.asj.integrador.service.ProveedorService;
import com.asj.integrador.service.ProvinciaService;
import com.asj.integrador.service.TipoIvaService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProveedorServiceImpl implements ProveedorService {

    private final PaisService paisService;
    private final ProvinciaService provinciaService;
    private final TipoIvaService tipoIvaService;
    private final ProveedorRepository proveedorRepository;
    private final ModelMapper mapper;

    public ProveedorServiceImpl(PaisService paisService, ProvinciaService provinciaService, TipoIvaService tipoIvaService, ProveedorRepository proveedorRepository, ModelMapper mapper) {
        this.paisService = paisService;
        this.provinciaService = provinciaService;
        this.tipoIvaService = tipoIvaService;
        this.proveedorRepository = proveedorRepository;
        this.mapper = mapper;
    }

    @Override
    public List<PaisResponseDTO> listarPaises() throws ResourceNotFoundException {
        return paisService.listarTodo();
    }

    @Override
    public List<ProvinciaResponseDTO> listarProvinciasPorPais(long id) throws ResourceNotFoundException {
        return provinciaService.buscarPorPais(id);
    }

    @Override
    public List<TipoIva> listarTiposIva() throws ResourceNotFoundException {
        return tipoIvaService.listarTodo();
    }
}
