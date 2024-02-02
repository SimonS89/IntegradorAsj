package com.asj.integrador.controller;

import com.asj.integrador.dto.request.OrdenCompraRequestDTO;
import com.asj.integrador.dto.response.OrdenCompraResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.service.OrdenCompraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/app/v1/orden")
public class OrdenCompraController {

    private final OrdenCompraService ordenCompraService;


    public OrdenCompraController(OrdenCompraService ordenCompraService) {
        this.ordenCompraService = ordenCompraService;
    }

    @PostMapping
    public ResponseEntity<OrdenCompraResponseDTO> crearOrden(@RequestBody OrdenCompraRequestDTO ordenCompraRequestDTO) throws AlreadyExistsException {
        return ResponseEntity.status(HttpStatus.CREATED).body(ordenCompraService.crear(ordenCompraRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdenCompraResponseDTO> buscarPorId(@PathVariable long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(ordenCompraService.buscarPorId(id));
    }

    @GetMapping("/estado/{id}")
    public ResponseEntity<Map<String,String>> cambiarEstadoOrden(@PathVariable long id) throws ResourceNotFoundException {
        ordenCompraService.cambiarEstadoOrden(id);
        HashMap<String, String> resp = new HashMap<>(Map.of("mensaje", "Modificado el estado de la orden  " + id));
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

    @GetMapping
    public ResponseEntity<List<OrdenCompraResponseDTO>> obtenerOrdenesFiltradasPorEstado(@RequestParam(defaultValue = "true") boolean activas) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(ordenCompraService.listarOrdenesFiltradas(activas));
    }

    @GetMapping("/validar/{numeroOrden}")
    public ResponseEntity<OrdenCompraResponseDTO> validarNumeroOrdenExistente(@PathVariable String numeroOrden) throws AlreadyExistsException {
        return ResponseEntity.status(HttpStatus.OK).body(ordenCompraService.validarNumeroOrdenExistente(numeroOrden));
    }
}
