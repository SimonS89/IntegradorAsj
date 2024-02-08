package com.asj.integrador.service.impl;

import com.asj.integrador.dto.ProveedorDTO;
import com.asj.integrador.dto.response.PaisResponseDTO;
import com.asj.integrador.dto.response.ProveedorResponseDTO;
import com.asj.integrador.dto.response.ProvinciaResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Proveedor;
import com.asj.integrador.model.TipoIva;
import com.asj.integrador.repository.ProveedorRepository;
import com.asj.integrador.service.*;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProveedorServiceImpl implements ProveedorService {

    private final RubroService rubroService;
    private final PaisService paisService;
    private final ProvinciaService provinciaService;
    private final TipoIvaService tipoIvaService;
    private final ProveedorRepository proveedorRepository;
    private final ModelMapper mapper;

    private final Logger logger = LoggerFactory.getLogger(ProveedorServiceImpl.class);

    public ProveedorServiceImpl(RubroService rubroService, PaisService paisService, ProvinciaService provinciaService, TipoIvaService tipoIvaService, ProveedorRepository proveedorRepository, ModelMapper mapper) {
        this.rubroService = rubroService;
        this.paisService = paisService;
        this.provinciaService = provinciaService;
        this.tipoIvaService = tipoIvaService;
        this.proveedorRepository = proveedorRepository;
        this.mapper = mapper;
    }

    @Override
    public ProveedorResponseDTO crearProveedor(ProveedorDTO proveedorDTO) throws ResourceNotFoundException {
        Proveedor proveedor = asignarValoresProveedor(proveedorDTO);
        return mapper.map(proveedorRepository.save(proveedor), ProveedorResponseDTO.class);
    }

    @Override
    public ProveedorResponseDTO actualizarProveedor(long id, ProveedorDTO proveedorDTO) throws ResourceNotFoundException {
        obtenerProveedorSiExiste(id);
        Proveedor proveedor = asignarValoresProveedor(proveedorDTO);
        proveedor.setId(id);
        return mapper.map(proveedorRepository.save(proveedor), ProveedorResponseDTO.class);
    }

    @Override
    public ProveedorDTO buscarPorId(long id) throws ResourceNotFoundException {
        Proveedor proveedor = obtenerProveedorSiExiste(id);
        return proveedorAProveedorDTO(proveedor);
    }

    @Override
    public ProveedorResponseDTO buscarPorIdDetalle(long id) throws ResourceNotFoundException {
        Proveedor proveedor = obtenerProveedorSiExiste(id);
        return mapper.map(proveedor, ProveedorResponseDTO.class);
    }

    @Override
    public List<ProveedorResponseDTO> listarProveedores() throws ResourceNotFoundException {
        List<Proveedor> proveedores = proveedorRepository.findAll();
        if (proveedores.isEmpty()) throw new ResourceNotFoundException("No hay proveedores.");
        return proveedores.stream().map(prov -> mapper.map(prov, ProveedorResponseDTO.class)).toList();
    }

    @Override
    public List<ProveedorResponseDTO> listarProveedoresFiltrados(boolean eliminados) throws ResourceNotFoundException {
        List<Proveedor> proveedores = proveedorRepository.findByEliminado(eliminados);
        if (proveedores.isEmpty()) throw new ResourceNotFoundException("No hay proveedores.");
        return proveedores.stream().map(prov -> mapper.map(prov, ProveedorResponseDTO.class)).toList();
    }

    @Override
    public void eliminadoLogico(Long id) throws ResourceNotFoundException {
        Proveedor proveedor = obtenerProveedorSiExiste(id);
        proveedor.setEliminado(!proveedor.isEliminado());
        proveedor.getProductos().stream().forEach(producto -> producto.setEliminado(proveedor.isEliminado()));
        proveedorRepository.save(proveedor);
    }

    @Override
    public List<PaisResponseDTO> listarPaises() throws ResourceNotFoundException {
        return paisService.listarTodo();
    }

    @Override
    public List<ProvinciaResponseDTO> listarProvinciasPorPais(long id) throws ResourceNotFoundException {
        return provinciaService.buscarPorPais(id);
    }

    @Override
    public List<TipoIva> listarTiposIva() throws ResourceNotFoundException {
        return tipoIvaService.listarTodo();
    }

    @Override
    public Proveedor buscarPorIdInterno(long id) throws ResourceNotFoundException {
        return proveedorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado"));
    }

    @Override
    public List<ProveedorResponseDTO> listarProductosPorRubro(long rubroId, boolean eliminado) throws ResourceNotFoundException {
        if (rubroId == 0) return listarProveedoresFiltrados(eliminado);
        List<Proveedor> proveedores = proveedorRepository.findByRubroIdAndEliminado(rubroId, eliminado);
        return proveedoresAProveedoresResponseDTO(proveedores);
    }

    @Override
    public ProveedorResponseDTO validarCodigoExistente(String codigo) throws AlreadyExistsException {
        Optional<Proveedor> proveedor = proveedorRepository.findByCodigo(codigo);
        if (proveedor.isPresent()) throw new AlreadyExistsException("Código existente.");
        return mapper.map(proveedor, ProveedorResponseDTO.class);
    }

    @Override
    public ProveedorResponseDTO validarCuitExistente(String cuit) throws AlreadyExistsException {
        Optional<Proveedor> proveedor = proveedorRepository.findByCuit(cuit);
        if (proveedor.isPresent()) throw new AlreadyExistsException("CUIT existente.");
        return mapper.map(proveedor, ProveedorResponseDTO.class);
    }

    @Override
    public int obtenerTotalProveedores(){
        return (int)proveedorRepository.count();
    }

    @Override
    public int obtenerProveedoresCreadosUltimoMes(){
        return proveedorRepository.countByFechaCreacionRegistroAfter(LocalDateTime.now().minusDays(30));
    }

    private List<ProveedorResponseDTO> proveedoresAProveedoresResponseDTO(List<Proveedor> proveedores) throws ResourceNotFoundException {
        if (proveedores.isEmpty()) throw new ResourceNotFoundException("No hay proveedores.");
        return proveedores.stream().map(prov -> mapper.map(prov, ProveedorResponseDTO.class)).toList();
    }

    private Proveedor obtenerProveedorSiExiste(long id) throws ResourceNotFoundException {
        return proveedorRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado"));
    }

    private ProveedorDTO proveedorAProveedorDTO(Proveedor proveedor) {
        ProveedorDTO proveedorDTO = mapper.map(proveedor, ProveedorDTO.class);
        proveedorDTO.setTipoIvaId(proveedor.getTipoIva().getId());
        proveedorDTO.setRubroId(proveedor.getRubro().getId());
        proveedorDTO.setProvinciaId(proveedor.getDomicilio().getProvincia().getId());
        proveedorDTO.setPaisId(proveedor.getDomicilio().getProvincia().getPais().getId());
        return proveedorDTO;
    }

    private Proveedor asignarValoresProveedor(ProveedorDTO proveedorDTO) throws ResourceNotFoundException {
        Proveedor proveedor = mapper.map(proveedorDTO, Proveedor.class);
        proveedor.setTipoIva(tipoIvaService.buscarPorId(proveedorDTO.getTipoIvaId()));
        proveedor.setRubro(rubroService.buscarPorIdInterno(proveedorDTO.getRubroId()));
        proveedor.getDomicilio().setProvincia(provinciaService.buscarPorId(proveedorDTO.getProvinciaId()));
        return proveedor;
    }
}
