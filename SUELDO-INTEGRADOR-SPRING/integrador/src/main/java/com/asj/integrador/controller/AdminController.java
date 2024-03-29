package com.asj.integrador.controller;

import com.asj.integrador.dto.request.CategoriaRequestDTO;
import com.asj.integrador.dto.request.RubroRequestDTO;
import com.asj.integrador.dto.response.*;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.service.CategoriaService;
import com.asj.integrador.service.OrdenCompraService;
import com.asj.integrador.service.RubroService;
import com.asj.integrador.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/app/v1/admin")
public class AdminController {

    private final CategoriaService categoriaService;
    private final RubroService rubroService;
    private final OrdenCompraService ordenCompraService;
    private final UsuarioService usuarioService;

    public AdminController(CategoriaService categoriaService, RubroService rubroService, OrdenCompraService ordenCompraService, UsuarioService usuarioService) {
        this.categoriaService = categoriaService;
        this.rubroService = rubroService;
        this.ordenCompraService = ordenCompraService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/categorias")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoriaResponseDTO> crearCategoria(@Valid @RequestBody CategoriaRequestDTO categoriaRequestDTO) throws AlreadyExistsException {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.crear(categoriaRequestDTO));
    }

    @PutMapping("/categorias/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoriaResponseDTO> actualizarCategoria(@PathVariable long id, @Valid @RequestBody CategoriaRequestDTO categoriaRequestDTO) throws ResourceNotFoundException, AlreadyExistsException {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.actualizar(id, categoriaRequestDTO));
    }

    @GetMapping("/categorias")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<CategoriaResponseDTO>> listarCategorias() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(categoriaService.listarTodo());
    }

    @GetMapping("/categorias-activas")
    public ResponseEntity<List<CategoriaResponseDTO>> listarCategoriasFiltradas(@RequestParam(defaultValue = "false") boolean eliminados) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(categoriaService.listarCategoriasFiltradas(eliminados));
    }

    @DeleteMapping("/categorias/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<AppResponse> eliminarCategoria(@PathVariable long id) throws ResourceNotFoundException, AlreadyExistsException {
        categoriaService.eliminadoLogico(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new AppResponse("Categoria eliminada correctamente"));
    }

    @PostMapping("/rubros")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<RubroResponseDTO> crearRubro(@Valid @RequestBody RubroRequestDTO rubroRequestDTO) throws AlreadyExistsException {
        return ResponseEntity.status(HttpStatus.CREATED).body(rubroService.crear(rubroRequestDTO));
    }

    @PutMapping("/rubros/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<RubroResponseDTO> actualizarRubro(@PathVariable long id, @Valid @RequestBody RubroRequestDTO rubroRequestDTO) throws ResourceNotFoundException, AlreadyExistsException {
        return ResponseEntity.status(HttpStatus.OK).body(rubroService.actualizar(id, rubroRequestDTO));
    }

    @GetMapping("/rubros")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<RubroResponseDTO>> listarRubros() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(rubroService.listarTodo());
    }

    @GetMapping("/rubros-activos")
    public ResponseEntity<List<RubroResponseDTO>> listarRubrosFiltrados(@RequestParam(defaultValue = "false") boolean eliminados) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(rubroService.listarRubrosFiltrados(eliminados));
    }

    @DeleteMapping("/rubros/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<AppResponse> eliminarRubro(@PathVariable long id) throws ResourceNotFoundException, AlreadyExistsException {
        rubroService.eliminadoLogico(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new AppResponse("Rubro eliminado correctamente"));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponseDTO> obtenerInfoDashboard() {
        return ResponseEntity.status(HttpStatus.OK).body(ordenCompraService.obtenerInfoDashboard());
    }

    @GetMapping("/usuarios")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UsuarioResponseDTO>> obtenerUsuarios() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.listarUsuarios());
    }


    @GetMapping("/usuarios/rol/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UsuarioResponseDTO> asignarOQuitarRolAdmin(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.asignarOQuitarRolAdmin(id));
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Map<String, String>> eliminarUsuario(@PathVariable long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.eliminarUsuario(id));
    }
}
