package com.asj.integrador.service;

import com.asj.integrador.dto.request.RubroRequestDTO;
import com.asj.integrador.dto.response.RubroResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Rubro;

import java.util.List;

public interface RubroService extends ModelService<RubroRequestDTO, RubroResponseDTO>{

    Rubro buscarPorIdInterno(long id) throws ResourceNotFoundException;

    List<RubroResponseDTO> listarRubrosFiltrados(boolean eliminados) throws ResourceNotFoundException;
}
