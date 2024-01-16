package com.asj.integrador.repository;

import com.asj.integrador.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepositroy extends JpaRepository<Categoria,Long> {
}
