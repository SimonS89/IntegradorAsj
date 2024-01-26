package com.asj.integrador.controller;

import com.asj.integrador.dto.ProductoDTO;
import com.asj.integrador.dto.response.ProductoResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/app/v1/producto")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    public ResponseEntity<ProductoResponseDTO> crearProducto(@RequestBody ProductoDTO productoDTO) throws AlreadyExistsException, ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.crearProducto(productoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> actualizarProducto(@PathVariable long id, @RequestBody ProductoDTO productoDTO) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(productoService.actualizarProducto(id, productoDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> buscarPorId(@PathVariable long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(productoService.buscarPorId(id));
    }

//    @GetMapping
//    public ResponseEntity<List<ProductoResponseDTO>> obtenerProductos() throws ResourceNotFoundException {
//        return ResponseEntity.status(HttpStatus.OK).body(productoService.listarProductos());
//    }

    @GetMapping
    public ResponseEntity<List<ProductoResponseDTO>> obtenerProveedoresFiltrados(@RequestParam(defaultValue = "false") boolean eliminados) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(productoService.listarProveedoresFiltrados(eliminados));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map> eliminarActivarProducto(@PathVariable long id) throws ResourceNotFoundException {
        productoService.eliminadoLogico(id);
        HashMap<String, String> resp = new HashMap<>(Map.of("mensaje", "Modificado el estado de eliminado del producto  " + id));
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
}
