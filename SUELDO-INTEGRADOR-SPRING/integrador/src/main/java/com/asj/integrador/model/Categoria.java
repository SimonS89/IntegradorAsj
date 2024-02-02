package com.asj.integrador.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoria;
    private boolean eliminado;
    @UpdateTimestamp
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaActualizacionRegistro;
    @CreationTimestamp
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaCreacionRegistro;

    public Categoria(String categoria) {
        this.categoria = categoria;
    }
}
