package com.asj.integrador.service;

import com.asj.integrador.dto.request.CategoriaRequestDTO;
import com.asj.integrador.dto.response.CategoriaResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Categoria;

import java.util.List;

public interface CategoriaService extends ModelService<CategoriaRequestDTO, CategoriaResponseDTO> {
    Categoria buscarPorIdInterno(long id) throws ResourceNotFoundException;

    List<CategoriaResponseDTO> listarCategoriasFiltradas(boolean eliminados) throws ResourceNotFoundException;
}
