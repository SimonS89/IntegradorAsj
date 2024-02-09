package com.asj.integrador.service;

import com.asj.integrador.dto.request.ActualizarPasswordRequestDTO;
import com.asj.integrador.dto.request.UsuarioRegistroRequestDTO;
import com.asj.integrador.dto.response.AutenticacionUsuarioResponseDTO;
import com.asj.integrador.dto.response.UsuarioResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Map;

public interface UsuarioService {
    UsuarioResponseDTO crearUsuario(UsuarioRegistroRequestDTO userRegisterRequestDTO) throws ResourceNotFoundException, AlreadyExistsException;

    UsuarioResponseDTO buscarPorId(Long id) throws ResourceNotFoundException;

    List<UsuarioResponseDTO> listarUsuarios() throws ResourceNotFoundException;

    void eliminadoLogico(Long id) throws ResourceNotFoundException;

    UsuarioResponseDTO asignarOQuitarRolAdmin(Long id) throws ResourceNotFoundException;

    Map<String, String> recuperarPassword(String username) throws ResourceNotFoundException;

    Map<String, String> resetearPassword(String hashedUsername) throws ResourceNotFoundException;

    AutenticacionUsuarioResponseDTO findByUsername(String username) throws ResourceNotFoundException;

    Map<String, String> actualizarPassword(ActualizarPasswordRequestDTO actualizarPassRequestDTO, String username) throws ResourceNotFoundException;

    AutenticacionUsuarioResponseDTO autenticarUsuarioYObtenerToken(String username) throws ResourceNotFoundException;

    UsuarioResponseDTO validarUsernameExistente(String username) throws AlreadyExistsException;
}
