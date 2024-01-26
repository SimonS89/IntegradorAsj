package com.asj.integrador.repository;

import com.asj.integrador.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto,Long> {
    Optional<Producto> findBySku(String sku);
    List<Producto> findByEliminado(boolean eliminado);
}
