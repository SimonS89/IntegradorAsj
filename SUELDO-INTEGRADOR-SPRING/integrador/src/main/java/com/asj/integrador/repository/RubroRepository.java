package com.asj.integrador.repository;

import com.asj.integrador.model.Rubro;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RubroRepository extends JpaRepository<Rubro, Long> {
    Optional<Rubro> findByRubroIgnoreCase(String rubro);

    List<Rubro> findByEliminado(boolean eliminado);
    @Query("SELECT COUNT(p) FROM Proveedor p WHERE p.rubro.id = ?1")
    Long countProveedoresByRubroId(Long rubroId);

}
