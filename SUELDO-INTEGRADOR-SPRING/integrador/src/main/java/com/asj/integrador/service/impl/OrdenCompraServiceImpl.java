package com.asj.integrador.service.impl;

import com.asj.integrador.dto.request.OrdenCompraRequestDTO;
import com.asj.integrador.dto.response.OrdenCompraResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.DetalleOrden;
import com.asj.integrador.model.OrdenCompra;
import com.asj.integrador.repository.OrdenCompraRepository;
import com.asj.integrador.service.DetalleOrdenService;
import com.asj.integrador.service.OrdenCompraService;
import com.asj.integrador.service.ProveedorService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdenCompraServiceImpl implements OrdenCompraService {

    private final OrdenCompraRepository ordenCompraRepository;
    private final DetalleOrdenService detalleOrdenService;
    private final ModelMapper mapper;
    private final ProveedorService proveedorService;
    private final Logger logger = LoggerFactory.getLogger(OrdenCompraServiceImpl.class);

    public OrdenCompraServiceImpl(OrdenCompraRepository ordenCompraRepository, DetalleOrdenService detalleOrdenService, ModelMapper mapper, ProveedorService proveedorService) {
        this.ordenCompraRepository = ordenCompraRepository;
        this.detalleOrdenService = detalleOrdenService;
        this.mapper = mapper;
        this.proveedorService = proveedorService;
    }

    @Override
    public OrdenCompraResponseDTO crear(OrdenCompraRequestDTO ordenCompraRequestDTO) throws AlreadyExistsException, ResourceNotFoundException {
        Optional<OrdenCompra> ordenEncontrada = ordenCompraRepository.findByNumeroOrden(ordenCompraRequestDTO.getNumeroOrden());
        if (ordenEncontrada.isPresent()) throw new AlreadyExistsException("número orden existente");
        OrdenCompra ordenCompra = mapper.map(ordenCompraRequestDTO, OrdenCompra.class);
        ordenCompra.setProveedor(proveedorService.buscarPorIdInterno(ordenCompraRequestDTO.getDetallesOrden().get(0).getProducto().getProveedor().getId()));
        ordenCompra.setTotal(calcularTotal(ordenCompraRequestDTO.getDetallesOrden()));
        ordenCompra = ordenCompraRepository.save(ordenCompra);
        for (DetalleOrden detalleOrden : ordenCompraRequestDTO.getDetallesOrden()) {
            detalleOrden.setOrdenCompra(ordenCompra);
            detalleOrdenService.crear(detalleOrden);
        }
        return mapper.map(ordenCompra, OrdenCompraResponseDTO.class);
    }

    @Override
    public OrdenCompraResponseDTO actualizarOrden(long id, OrdenCompraRequestDTO ordenCompraRequestDTO) throws ResourceNotFoundException {
        OrdenCompra ordenCompra = obtenerOrdenSiExiste(id);
        ordenCompra.setInfoRecepcion(ordenCompraRequestDTO.getInfoRecepcion());
        ordenCompra.setFechaEntrega(ordenCompraRequestDTO.getFechaEntrega());
        ordenCompra.setInfoAdicional(ordenCompraRequestDTO.getInfoAdicional());
        return mapper.map(ordenCompraRepository.save(ordenCompra), OrdenCompraResponseDTO.class);
    }

    @Override
    public List<OrdenCompraResponseDTO> listarOdenes() throws ResourceNotFoundException {
        List<OrdenCompra> ordenes = ordenCompraRepository.findAll();
        return ordenesAOrdenesResponseDTO(ordenes);
    }

    @Override
    public OrdenCompraResponseDTO buscarPorId(long id) throws ResourceNotFoundException {
        OrdenCompra orden = obtenerOrdenSiExiste(id);
        return mapper.map(orden, OrdenCompraResponseDTO.class);
    }

    @Override
    public void cambiarEstadoOrden(long id) throws ResourceNotFoundException {
        OrdenCompra orden = obtenerOrdenSiExiste(id);
        orden.setActiva(!orden.getActiva());
        ordenCompraRepository.save(orden);
    }

    @Override
    public List<OrdenCompraResponseDTO> listarOrdenesFiltradas(boolean activas) throws ResourceNotFoundException {
        List<OrdenCompra> ordenes = ordenCompraRepository.findByActiva(activas);
        return ordenesAOrdenesResponseDTO(ordenes);
    }

    @Override
    public OrdenCompraResponseDTO validarNumeroOrdenExistente(String numeroOrden) throws AlreadyExistsException {
        Optional<OrdenCompra> orden = ordenCompraRepository.findByNumeroOrden(numeroOrden);
        if (orden.isPresent()) throw new AlreadyExistsException("Número orden existente.");
        return mapper.map(orden, OrdenCompraResponseDTO.class);
    }

    private List<OrdenCompraResponseDTO> ordenesAOrdenesResponseDTO(List<OrdenCompra> ordenes) throws ResourceNotFoundException {
        if (ordenes.isEmpty()) throw new ResourceNotFoundException("No hay productos.");
        return ordenes.stream().map(orden -> mapper.map(orden, OrdenCompraResponseDTO.class)
        ).toList();
    }

    private OrdenCompra obtenerOrdenSiExiste(long id) throws ResourceNotFoundException {
        return ordenCompraRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
    }

    private double calcularTotal(List<DetalleOrden> detallesOrden) {
        if (detallesOrden != null && !detallesOrden.isEmpty()) {
            return detallesOrden.stream()
                    .mapToDouble(detalle -> detalle.getPrecio() * detalle.getCantidad())
                    .sum();
        } else {
            return 0.0;
        }
    }
}
