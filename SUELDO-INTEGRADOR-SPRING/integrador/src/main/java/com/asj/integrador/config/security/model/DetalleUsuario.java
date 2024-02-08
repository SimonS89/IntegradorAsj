package com.asj.integrador.config.security.model;

import com.asj.integrador.model.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class DetalleUsuario implements UserDetails {

    private final String username;
    private final String password;
    private final List<GrantedAuthority> authorities;

    public DetalleUsuario(Usuario usuario) {
        username = usuario.getUsername();
        password = usuario.getPassword();
        authorities = usuario.getRoles().stream().map(rol -> new SimpleGrantedAuthority(rol.getRol().name())).collect(Collectors.toList());
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
