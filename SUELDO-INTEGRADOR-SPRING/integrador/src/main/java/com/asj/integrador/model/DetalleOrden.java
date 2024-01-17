package com.asj.integrador.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "detalles_orden")
public class DetalleOrden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double precio;
    private int cantidad;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orden_compra_id", referencedColumnName = "id", nullable = false)
    private OrdenCompra ordenCompra;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id", referencedColumnName = "id", nullable = false)
    private Producto producto;
}
