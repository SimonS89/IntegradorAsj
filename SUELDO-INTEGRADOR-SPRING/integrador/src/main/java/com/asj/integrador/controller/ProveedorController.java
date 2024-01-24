package com.asj.integrador.controller;

import com.asj.integrador.dto.response.PaisResponseDTO;
import com.asj.integrador.dto.response.ProvinciaResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.TipoIva;
import com.asj.integrador.service.ProveedorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/app/v1/proveedor")
public class ProveedorController {

    private final ProveedorService proveedorService;

    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }

    @GetMapping("/paises")
    public ResponseEntity<List<PaisResponseDTO>> obtenerPaises() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(proveedorService.listarPaises());
    }

    @GetMapping("/paises/{id}/provincias")
    public ResponseEntity<List<ProvinciaResponseDTO>> obtenerProvincias(@PathVariable long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(proveedorService.listarProvinciasPorPais(id));
    }

    @GetMapping("/tipos_iva")
    public ResponseEntity<List<TipoIva>> obtenerTiposIva() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(proveedorService.listarTiposIva());
    }
}
