package com.asj.integrador.repository;

import com.asj.integrador.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor,Long> {
    List<Proveedor> findByEliminado(boolean eliminado);

    List<Proveedor> findByRubroIdAndEliminado(Long rubroId,boolean eliminado);
}
