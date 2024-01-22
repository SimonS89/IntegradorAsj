package com.asj.integrador.service;

import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Pais;

import java.util.List;

public interface PaisService {
    void createPaises();
    List<Pais> findAll() throws ResourceNotFoundException;
}
