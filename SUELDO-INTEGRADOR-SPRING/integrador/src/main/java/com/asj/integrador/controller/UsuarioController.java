package com.asj.integrador.controller;

import com.asj.integrador.dto.request.ActualizarPasswordRequestDTO;
import com.asj.integrador.dto.request.AutenticacionUsuarioRequestDTO;
import com.asj.integrador.dto.request.UsuarioRegistroRequestDTO;
import com.asj.integrador.dto.response.AutenticacionUsuarioResponseDTO;
import com.asj.integrador.dto.response.UsuarioResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/app/v1/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;

    public UsuarioController(UsuarioService usuarioService, AuthenticationManager authenticationManager) {
        this.usuarioService = usuarioService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> crearUsuario(@Valid @RequestBody UsuarioRegistroRequestDTO usuario) throws AlreadyExistsException, ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.crearUsuario(usuario));
    }

    @PostMapping("/autenticar")
    public ResponseEntity<AutenticacionUsuarioResponseDTO> authenticateAndGetToken(@Valid @RequestBody AutenticacionUsuarioRequestDTO authRequestDTO) throws ResourceNotFoundException {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
        if (authenticate.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.autenticarUsuarioYObtenerToken(authRequestDTO.getUsername()));
        }
        throw new UsernameNotFoundException("Solicitud de usuario invalida");
    }

    @GetMapping("/recuperar_password/{username}")
    public ResponseEntity<Map<String, String>> recuperarPassword(@PathVariable String username) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.recuperarPassword(username));
    }

    @GetMapping("/resetear_password/{username}")
    public ResponseEntity<Map<String, String>> resetPassword(@PathVariable String username) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.resetearPassword(username));
    }

    @GetMapping("/validar/{username}")
    public ResponseEntity<UsuarioResponseDTO> validarUsernameExistente(@PathVariable String username) throws AlreadyExistsException {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.validarUsernameExistente(username));
    }

    @PatchMapping("/modificar_password")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ResponseEntity<Map<String, String>> modifyPassword(@Valid @RequestBody ActualizarPasswordRequestDTO actualizarPasswordRequestDTO, Authentication authentication) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.actualizarPassword(actualizarPasswordRequestDTO, authentication.getName()));
    }
}
