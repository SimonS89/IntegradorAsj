package com.asj.integrador.service;

import com.asj.integrador.dto.request.OrdenCompraRequestDTO;
import com.asj.integrador.dto.response.OrdenCompraResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;

import java.util.List;

public interface OrdenCompraService {
    OrdenCompraResponseDTO crear(OrdenCompraRequestDTO ordenCompraRequestDTO) throws AlreadyExistsException;

    List<OrdenCompraResponseDTO> listarOdenes() throws ResourceNotFoundException;

    OrdenCompraResponseDTO buscarPorId(long id) throws ResourceNotFoundException;

    void cambiarEstadoOrden(long id) throws ResourceNotFoundException;

    List<OrdenCompraResponseDTO> listarOrdenesFiltradas(boolean activas) throws ResourceNotFoundException;

    OrdenCompraResponseDTO validarNumeroOrdenExistente(String numeroOrden) throws AlreadyExistsException;
}
