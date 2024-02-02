package com.asj.integrador.service;

import com.asj.integrador.dto.response.PaisResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;

import java.util.List;

public interface PaisService {
    void crearPaises();

    List<PaisResponseDTO> listarTodo() throws ResourceNotFoundException;
}
