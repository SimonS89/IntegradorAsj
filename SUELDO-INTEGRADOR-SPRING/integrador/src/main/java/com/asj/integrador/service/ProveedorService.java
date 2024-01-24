package com.asj.integrador.service;

import com.asj.integrador.dto.response.PaisResponseDTO;
import com.asj.integrador.dto.response.ProvinciaResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.TipoIva;

import java.util.List;

public interface ProveedorService {
    List<PaisResponseDTO> listarPaises() throws ResourceNotFoundException;

    List<ProvinciaResponseDTO> listarProvinciasPorPais(long id) throws ResourceNotFoundException;

    List<TipoIva> listarTiposIva() throws ResourceNotFoundException;
}
