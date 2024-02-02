package com.asj.integrador.repository;

import com.asj.integrador.model.RepresentanteContacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepresentanteContactoRepository extends JpaRepository<RepresentanteContacto, Long> {
}
