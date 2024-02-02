package com.asj.integrador.repository;

import com.asj.integrador.model.TipoIva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoIvaRepository extends JpaRepository<TipoIva, Long> {
}
