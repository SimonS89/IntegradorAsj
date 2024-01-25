package com.asj.integrador.service;

import com.asj.integrador.dto.ProveedorDTO;
import com.asj.integrador.dto.response.PaisResponseDTO;
import com.asj.integrador.dto.response.ProveedorResponseDTO;
import com.asj.integrador.dto.response.ProvinciaResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.TipoIva;

import java.util.List;

public interface ProveedorService {
    ProveedorResponseDTO actualizarProveedor(long id, ProveedorDTO proveedorDTO) throws ResourceNotFoundException;

    ProveedorDTO buscarPorId(long id) throws ResourceNotFoundException;

    List<ProveedorResponseDTO> listarProveedores() throws ResourceNotFoundException;

    void eliminadoLogico(Long id) throws ResourceNotFoundException;

    List<PaisResponseDTO> listarPaises() throws ResourceNotFoundException;
    List<ProvinciaResponseDTO> listarProvinciasPorPais(long id) throws ResourceNotFoundException;
    List<TipoIva> listarTiposIva() throws ResourceNotFoundException;
    ProveedorResponseDTO crearProveedor(ProveedorDTO proveedorDTO) throws ResourceNotFoundException;
}
