package com.asj.integrador.repository;

import com.asj.integrador.model.OrdenCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenCompraRepository extends JpaRepository<OrdenCompra, Long> {
    Optional<OrdenCompra> findByNumeroOrden(String numeroOrden);

    @Query("SELECT AVG(o.total) FROM OrdenCompra o")
    Double calcularPromedioTotal();

    @Query("SELECT AVG(d.cantidad) FROM OrdenCompra o JOIN o.detallesOrden d")
    Double calcularPromedioCantidadItems();

    List<OrdenCompra> findByActiva(boolean activa);
}
