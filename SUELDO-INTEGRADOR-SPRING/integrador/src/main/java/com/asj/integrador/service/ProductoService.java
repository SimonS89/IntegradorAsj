package com.asj.integrador.service;

import com.asj.integrador.dto.ProductoDTO;
import com.asj.integrador.dto.response.ProductoResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;

import java.util.List;

public interface ProductoService {
    ProductoResponseDTO crearProducto(ProductoDTO productoDTO) throws ResourceNotFoundException, AlreadyExistsException;

    ProductoResponseDTO actualizarProducto(long id, ProductoDTO productoDTO) throws ResourceNotFoundException;

    ProductoDTO buscarPorId(long id) throws ResourceNotFoundException;

    List<ProductoResponseDTO> listarProductos() throws ResourceNotFoundException;

    List<ProductoResponseDTO> listarProductosFiltrados(boolean eliminados) throws ResourceNotFoundException;

    List<ProductoResponseDTO> listarProductosPorProveedor(long proveedorId) throws ResourceNotFoundException;

    void eliminadoLogico(long id) throws ResourceNotFoundException;
}
