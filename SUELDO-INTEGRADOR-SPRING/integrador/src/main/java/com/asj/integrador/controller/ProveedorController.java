package com.asj.integrador.controller;

import com.asj.integrador.dto.response.PaisResponseDTO;
import com.asj.integrador.dto.response.ProvinciaResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.TipoIva;
import com.asj.integrador.service.PaisService;
import com.asj.integrador.service.ProveedorService;
import com.asj.integrador.service.ProvinciaService;
import com.asj.integrador.service.TipoIvaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/app/v1/proveedor")
public class ProveedorController {

    private final PaisService paisService;
    private final ProvinciaService provinciaService;
    private final TipoIvaService tipoIvaService;
    private final ProveedorService proveedorService;

    public ProveedorController(PaisService paisService, ProvinciaService provinciaService, TipoIvaService tipoIvaService, ProveedorService proveedorService) {
        this.paisService = paisService;
        this.provinciaService = provinciaService;
        this.tipoIvaService = tipoIvaService;
        this.proveedorService = proveedorService;
    }

    @GetMapping("/paises")
    public ResponseEntity<List<PaisResponseDTO>> obtenerPaises() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(paisService.listarTodo());
    }

    @GetMapping("/paises/{id}/provincias")
    public ResponseEntity<List<ProvinciaResponseDTO>> obtenerProvincias(@PathVariable long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(provinciaService.buscarPorPais(id));
    }

    @GetMapping("/tipos_iva")
    public ResponseEntity<List<TipoIva>> obtenerTiposIva() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(tipoIvaService.listarTodo());
    }
}
