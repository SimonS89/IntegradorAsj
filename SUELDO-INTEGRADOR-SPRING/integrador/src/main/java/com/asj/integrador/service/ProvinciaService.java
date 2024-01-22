package com.asj.integrador.service;

import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Pais;
import com.asj.integrador.model.Provincia;

import java.util.List;

public interface ProvinciaService {
    void crearProvincias(Pais pais);

    List<Provincia> findByPais(Long paisId) throws ResourceNotFoundException;
    Provincia findById(Long id) throws ResourceNotFoundException;
}
