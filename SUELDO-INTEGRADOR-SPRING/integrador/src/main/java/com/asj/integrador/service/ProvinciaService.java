package com.asj.integrador.service;

import com.asj.integrador.dto.response.ProvinciaResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Pais;
import com.asj.integrador.model.Provincia;

import java.util.List;

public interface ProvinciaService {
    void crearProvincias(Pais pais);

    List<ProvinciaResponseDTO> buscarPorPais(Long paisId) throws ResourceNotFoundException;
    Provincia buscarPorId(Long id) throws ResourceNotFoundException;
}
