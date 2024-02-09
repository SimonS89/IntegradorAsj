package com.asj.integrador.service.impl;

import com.asj.integrador.config.security.service.JwtService;
import com.asj.integrador.dto.request.ActualizarPasswordRequestDTO;
import com.asj.integrador.dto.request.UsuarioRegistroRequestDTO;
import com.asj.integrador.dto.response.AutenticacionUsuarioResponseDTO;
import com.asj.integrador.dto.response.UsuarioResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.RolUsuario;
import com.asj.integrador.model.Usuario;
import com.asj.integrador.repository.UsuarioRepository;
import com.asj.integrador.service.EmailService;
import com.asj.integrador.service.RolUsuarioService;
import com.asj.integrador.service.UsuarioService;
import com.asj.integrador.util.Encriptador;
import com.asj.integrador.util.Rol;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    public static final String NO_ENCONTRADO = "No se encontró el usuario.";
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper mapper;
    private final RolUsuarioService rolService;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final Encriptador encriptador;
    private final Logger logger = LoggerFactory.getLogger(UsuarioServiceImpl.class);

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, ModelMapper mapper, RolUsuarioService rolService, EmailService emailService, JwtService jwtService, Encriptador encriptador) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.mapper = mapper;
        this.rolService = rolService;
        this.emailService = emailService;
        this.jwtService = jwtService;
        this.encriptador = encriptador;
    }



    @Override
    public UsuarioResponseDTO crearUsuario(UsuarioRegistroRequestDTO userRegisterRequestDTO) throws ResourceNotFoundException, AlreadyExistsException {
        if (!userRegisterRequestDTO.getPassword().equals(userRegisterRequestDTO.getRePassword()))
            throw new ResourceNotFoundException("Las contraseñas ingresadas no coinciden.");
        if (usuarioRepository.findByUsername(userRegisterRequestDTO.getUsername()).isPresent())
            throw new AlreadyExistsException("El nombre de usuario ya existe.");
        Usuario usuario = mapper.map(userRegisterRequestDTO, Usuario.class);
        usuario.setPassword(passwordEncoder.encode(userRegisterRequestDTO.getPassword()));
        usuario.setRoles((new ArrayList<>(Collections.singletonList(rolService.buscarPorRol(Rol.USER)))));
        usuario = usuarioRepository.save(usuario);
        emailService.enviarMail(usuario.getEmail(), "Bienvenido/a a ASJ servicios", emailService.msgBienvenida(usuario.getUsername()));
        return mapper.map(usuario, UsuarioResponseDTO.class);
    }

    @Override
    public UsuarioResponseDTO buscarPorId(Long id) throws ResourceNotFoundException {
        return usuarioRepository.findById(id).map(usuario -> mapper.map(usuario, UsuarioResponseDTO.class)).orElseThrow(() -> new ResourceNotFoundException(NO_ENCONTRADO));
    }

    @Override
    public List<UsuarioResponseDTO> listarUsuarios() throws ResourceNotFoundException {
        List<Usuario> usersSearch = usuarioRepository.findAll();
        if (usersSearch.isEmpty()) throw new ResourceNotFoundException("No hay usuarios en la base de datos.");
        return usersSearch.stream().map(userEntity -> mapper.map(userEntity, UsuarioResponseDTO.class)).toList();
    }

    @Override
    public void eliminadoLogico(Long id) throws ResourceNotFoundException {
        Usuario usuario = obtenerUsuarioSiExiste(id);
        usuario.setEliminado(!usuario.isEliminado());
        usuarioRepository.save(usuario);
    }

    @Override
    public Map<String, String> eliminarUsuario(Long id) throws ResourceNotFoundException {
        Usuario usuario = obtenerUsuarioSiExiste(id);
        usuarioRepository.deleteById(id);
        return Map.of("message", "Usuario " + usuario.getUsername() + " eliminado exitosamente");
    }

    @Override
    public UsuarioResponseDTO asignarOQuitarRolAdmin(Long id) throws ResourceNotFoundException {
        Usuario usuario = obtenerUsuarioSiExiste(id);
        RolUsuario admin = rolService.buscarPorRol(Rol.ADMIN);
        if (!usuario.getRoles().contains(admin)) usuario.getRoles().add(admin);
        else usuario.getRoles().remove(admin);
        return mapper.map(usuarioRepository.save(usuario), UsuarioResponseDTO.class);
    }

    @Override
    public Map<String, String> recuperarPassword(String username) throws ResourceNotFoundException {
        Usuario usuario = obtenerUsuarioPorUsername(username);
        String hashedUsername = encriptador.encrypt(username);
        emailService.enviarMail(usuario.getEmail(), "Recuperar contraseña", emailService.msgRecuperarContrasenia(username, hashedUsername));
        return Map.of("message", "Correo electrónico de recuperación de contraseña enviado correctamente a " + username);
    }

    @Override
    public Map<String, String> resetearPassword(String hashedUsername) throws ResourceNotFoundException {
        Usuario usuario = obtenerUsuarioPorUsername(encriptador.decrypt(hashedUsername));
        logger.info(encriptador.decrypt(hashedUsername));
        String newPassword = String.valueOf(UUID.randomUUID()).substring(0, 7);
        usuario.setPassword(passwordEncoder.encode(newPassword));
        emailService.enviarMail(usuario.getEmail(), "Restablecer la contraseña", emailService.msgResetearContrasenia(usuario.getUsername(), newPassword));
        usuarioRepository.save(usuario);
        return Map.of("message", "Correo electrónico para restablecer la contraseña enviado correctamente a " + usuario.getUsername());
    }

    @Override
    public AutenticacionUsuarioResponseDTO findByUsername(String username) throws ResourceNotFoundException {
        Usuario usuario = obtenerUsuarioPorUsername(username);
        return mapper.map(usuario, AutenticacionUsuarioResponseDTO.class);
    }

    @Override
    public Map<String, String> actualizarPassword(ActualizarPasswordRequestDTO actualizarPassRequestDTO, String username) throws ResourceNotFoundException {
        Usuario usuario = obtenerUsuarioPorUsername(username);
        if (!passwordEncoder.matches(actualizarPassRequestDTO.getCurrentPassword(), usuario.getPassword()))
            throw new ResourceNotFoundException("La contraseña actual es incorrecta.");
        if (!actualizarPassRequestDTO.getPassword().equals(actualizarPassRequestDTO.getRePassword()))
            throw new ResourceNotFoundException("Las nuevas contraseñas no coinciden.");
        usuario.setPassword(passwordEncoder.encode(actualizarPassRequestDTO.getPassword()));
        usuarioRepository.save(usuario);
        emailService.enviarMail(usuario.getEmail(), "Actualizar contraseña", emailService.actualizarContrasenia(username));
        return Map.of("message", "Contraseña actualizada correctamente.");
    }

    @Override
    public AutenticacionUsuarioResponseDTO autenticarUsuarioYObtenerToken(String username) throws ResourceNotFoundException {
        AutenticacionUsuarioResponseDTO autenticacionResponseDTO = findByUsername(username);
        autenticacionResponseDTO.setToken(jwtService.generateToken(username));
        return autenticacionResponseDTO;
    }

    @Override
    public UsuarioResponseDTO validarUsernameExistente(String username) throws AlreadyExistsException {
        Optional<Usuario> usuario = usuarioRepository.findByUsername(username);
        if (usuario.isPresent()) throw new AlreadyExistsException("Username existente.");
        return mapper.map(usuario, UsuarioResponseDTO.class);
    }

    private Usuario obtenerUsuarioPorUsername(String username) throws ResourceNotFoundException {
        return usuarioRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException(NO_ENCONTRADO));
    }

    private Usuario obtenerUsuarioSiExiste(Long id) throws ResourceNotFoundException {
        return usuarioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(NO_ENCONTRADO));
    }

    @Override
    public void defaultAdmin() throws ResourceNotFoundException {
        if (usuarioRepository.findAll().isEmpty()) {
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("Admin123"));
            admin.setEmail("ssueldo@asjservicios.com");
            admin.setRoles((new ArrayList<>(Arrays.asList(rolService.buscarPorRol(Rol.ADMIN), rolService.buscarPorRol(Rol.USER)))));
            usuarioRepository.save(admin);
        }
    }
}
