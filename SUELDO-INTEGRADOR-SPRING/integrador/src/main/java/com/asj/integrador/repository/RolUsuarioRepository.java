package com.asj.integrador.repository;

import com.asj.integrador.model.RolUsuario;
import com.asj.integrador.util.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolUsuarioRepository extends JpaRepository<RolUsuario,Long> {
    Optional<RolUsuario> findByRol(Rol rol);
}
