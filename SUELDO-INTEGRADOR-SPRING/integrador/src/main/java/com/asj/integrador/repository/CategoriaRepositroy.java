package com.asj.integrador.repository;

import com.asj.integrador.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepositroy extends JpaRepository<Categoria,Long> {
    Optional<Categoria> findByCategoriaIgnoreCase(String categoria);
    List<Categoria> findByEliminado(boolean eliminado);
}
