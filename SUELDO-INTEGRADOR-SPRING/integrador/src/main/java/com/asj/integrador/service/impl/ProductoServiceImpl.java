package com.asj.integrador.service.impl;

import com.asj.integrador.dto.ProductoDTO;
import com.asj.integrador.dto.response.ProductoResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Producto;
import com.asj.integrador.repository.ProductoRepository;
import com.asj.integrador.service.CategoriaService;
import com.asj.integrador.service.ProductoService;
import com.asj.integrador.service.ProveedorService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ModelMapper mapper;
    private final CategoriaService categoriaService;
    private final ProveedorService proveedorService;
    private final Logger logger = LoggerFactory.getLogger(ProveedorServiceImpl.class);

    public ProductoServiceImpl(ProductoRepository productoRepository, ModelMapper mapper, CategoriaServiceImpl categoriaService, ProveedorService proveedorService) {
        this.productoRepository = productoRepository;
        this.mapper = mapper;
        this.categoriaService = categoriaService;
        this.proveedorService = proveedorService;
    }

    @Override
    public ProductoResponseDTO crearProducto(ProductoDTO productoDTO) throws ResourceNotFoundException, AlreadyExistsException {
        Optional<Producto> productoEncontrado = productoRepository.findBySku(productoDTO.getSku());
        if (productoEncontrado.isPresent()) throw new AlreadyExistsException("Sku existente");
        Producto producto = asignarValoresProducto(productoDTO);
        producto.setProveedor(proveedorService.buscarPorIdInterno(productoDTO.getProveedorId()));
        return mapper.map(productoRepository.save(producto), ProductoResponseDTO.class);
    }

    @Override
    public ProductoResponseDTO actualizarProducto(long id, ProductoDTO productoDTO) throws ResourceNotFoundException {
        long idProveedor = obtenerProductoSiExiste(id).getProveedor().getId();
        Producto producto = asignarValoresProducto(productoDTO);
        producto.setId(id);
        producto.setProveedor(proveedorService.buscarPorIdInterno(idProveedor));
        return mapper.map(productoRepository.save(producto), ProductoResponseDTO.class);
    }

    @Override
    public ProductoDTO buscarPorId(long id) throws ResourceNotFoundException {
        Producto producto = obtenerProductoSiExiste(id);
        return productoAProductoDTO(producto);
    }

    @Override
    public List<ProductoResponseDTO> listarProductos() throws ResourceNotFoundException {
        List<Producto> productos = productoRepository.findAll();
        if (productos.isEmpty()) throw new ResourceNotFoundException("No hay productos.");
        return productos.stream().map(prod -> mapper.map(prod, ProductoResponseDTO.class)).toList();
    }

    @Override
    public List<ProductoResponseDTO> listarProveedoresFiltrados(boolean eliminados) throws ResourceNotFoundException {
        List<Producto> productos = productoRepository.findByEliminado(eliminados);
        if (productos.isEmpty()) throw new ResourceNotFoundException("No hay productos.");
        return productos.stream().map(prod -> mapper.map(prod, ProductoResponseDTO.class)).toList();
    }

    @Override
    public void eliminadoLogico(long id) throws ResourceNotFoundException {
        Producto producto = obtenerProductoSiExiste(id);
        producto.setEliminado(!producto.isEliminado());
        productoRepository.save(producto);
    }

    private Producto obtenerProductoSiExiste(long id) throws ResourceNotFoundException {
        return productoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
    }

    private Producto asignarValoresProducto(ProductoDTO productoDTO) throws ResourceNotFoundException {
        Producto producto = mapper.map(productoDTO, Producto.class);
        producto.setCategoria(categoriaService.buscarPorIdInterno(productoDTO.getCategoriaId()));
        return producto;
    }

    private ProductoDTO productoAProductoDTO(Producto producto) {
        ProductoDTO productoDTO = mapper.map(producto, ProductoDTO.class);
        productoDTO.setCategoriaId(producto.getCategoria().getId());
        productoDTO.setProveedorId(producto.getProveedor().getId());
        return productoDTO;
    }
}
