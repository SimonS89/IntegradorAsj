package com.asj.integrador.controller;

import com.asj.integrador.dto.request.CategoriaRequestDTO;
import com.asj.integrador.dto.request.RubroRequestDTO;
import com.asj.integrador.dto.response.AppResponse;
import com.asj.integrador.dto.response.CategoriaResponseDTO;
import com.asj.integrador.dto.response.RubroResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Rubro;
import com.asj.integrador.service.CategoriaService;
import com.asj.integrador.service.RubroService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/app/v1/admin")
public class AdminController {

    private final CategoriaService categoriaService;
    private final RubroService rubroService;

    public AdminController(CategoriaService categoriaService, RubroService rubroService) {
        this.categoriaService = categoriaService;
        this.rubroService = rubroService;
    }

    @PostMapping("/categoria")
    public ResponseEntity<CategoriaResponseDTO> crearCategoria(@Valid @RequestBody CategoriaRequestDTO categoriaRequestDTO) throws AlreadyExistsException {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.crear(categoriaRequestDTO));
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<CategoriaResponseDTO>> listarCategorias() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(categoriaService.listarTodo());
    }

    @DeleteMapping("/categoria/{id}")
    public ResponseEntity<AppResponse> eliminarCategoria(@PathVariable long id) throws ResourceNotFoundException {
        categoriaService.eliminar(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new AppResponse("Categoria eliminada correctamente"));
    }

    @PostMapping("/rubro")
    public ResponseEntity<RubroResponseDTO> crearRubro(@Valid @RequestBody RubroRequestDTO rubroRequestDTO) throws AlreadyExistsException {
        return ResponseEntity.status(HttpStatus.CREATED).body(rubroService.crear(rubroRequestDTO));
    }

    @GetMapping("/rubros")
    public ResponseEntity<List<RubroResponseDTO>> listarRubros() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(rubroService.listarTodo());
    }

    @DeleteMapping("/rubro/{id}")
    public ResponseEntity<AppResponse> eliminarRubro(@PathVariable long id) throws ResourceNotFoundException {
        rubroService.eliminar(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new AppResponse("Rubro eliminado correctamente"));
    }

}
