package com.asj.integrador.repository;

import com.asj.integrador.model.Rubro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RubroRepository extends JpaRepository<Rubro,Long> {
    Optional<Rubro> findByRubro(String rubro);
}
