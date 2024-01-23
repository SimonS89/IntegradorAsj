package com.asj.integrador.controller;

import com.asj.integrador.dto.response.PaisResponseDTO;
import com.asj.integrador.dto.response.ProvinciaResponseDTO;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.service.PaisService;
import com.asj.integrador.service.ProveedorService;
import com.asj.integrador.service.ProvinciaService;
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
    private final ProveedorService proveedorService;

    public ProveedorController(PaisService paisService, ProvinciaService provinciaService, ProveedorService proveedorService) {
        this.paisService = paisService;
        this.provinciaService = provinciaService;
        this.proveedorService = proveedorService;
    }

    @GetMapping("/paises")
    public ResponseEntity<List<PaisResponseDTO>> obtenerPaises() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(paisService.findAll());
    }

    @GetMapping("/paises/{id}/provincias")
    public ResponseEntity<List<ProvinciaResponseDTO>> obtenerProvincias(@PathVariable long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(provinciaService.findByPais(id));
    }
}
