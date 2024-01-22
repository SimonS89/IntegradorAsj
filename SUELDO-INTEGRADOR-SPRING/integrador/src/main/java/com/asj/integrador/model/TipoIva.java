package com.asj.integrador.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tipos_iva")
public class TipoIva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipoIva;

    public TipoIva(String tipoIva) {
        this.tipoIva = tipoIva;
    }
}
