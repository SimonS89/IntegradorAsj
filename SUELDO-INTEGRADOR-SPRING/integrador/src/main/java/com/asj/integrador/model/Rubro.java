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
    private LocalDateTime fechaActualizacionRegistro;
    @CreationTimestamp
    private LocalDateTime fechaCreacionRegistro;

    public Rubro(String rubro) {
        this.rubro = rubro;
    }

    public void asd(){
    }
}
