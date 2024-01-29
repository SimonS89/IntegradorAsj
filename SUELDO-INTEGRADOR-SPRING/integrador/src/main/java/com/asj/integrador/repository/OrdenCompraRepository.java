package com.asj.integrador.repository;

import com.asj.integrador.model.OrdenCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenCompraRepository extends JpaRepository<OrdenCompra,Long> {
    Optional<OrdenCompra> findByNumeroOrden(String numeroOrden);
    List<OrdenCompra> findByActiva(boolean activa);
}
