package com.asj.integrador.config.security.service;

import com.asj.integrador.config.security.model.DetalleUsuario;
import com.asj.integrador.model.Usuario;
import com.asj.integrador.repository.UsuarioRepository;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UsuarioDetalleService implements UserDetailsService {

    @Autowired
    private  UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByUsername(username);
        return usuario.map(DetalleUsuario::new).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado - " + username));
    }
}
