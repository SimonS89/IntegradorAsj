package com.asj.integrador.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "rubros")
public class Rubro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String rubro;
    private boolean eliminado;
    @UpdateTimestamp
    @JsonFormat(pattern="dd/MM/yyyy HH:mm")
    private LocalDateTime fechaActualizacionRegistro;
    @CreationTimestamp
    @JsonFormat(pattern="dd/MM/yyyy HH:mm")
    private LocalDateTime fechaCreacionRegistro;

    public Rubro(String rubro) {
        this.rubro = rubro;
    }
}
