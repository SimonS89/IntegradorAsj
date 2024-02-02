package com.asj.integrador.repository;

import com.asj.integrador.model.Provincia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProvinciaRepository extends JpaRepository<Provincia, Long> {
    List<Provincia> findByPaisId(Long paisId);
}
