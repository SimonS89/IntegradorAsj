package com.asj.integrador.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ordenes_compra")
public class OrdenCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String numeroOrden;
    private Double total;
    private String infoRecepcion;
    private String infoAdicional;
    private Boolean activa = true;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaEmision;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaEntrega;
    @UpdateTimestamp
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaActualizacionRegistro;
    @CreationTimestamp
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaCreacionRegistro;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "proveedor_id", referencedColumnName = "id", nullable = false)
    private Proveedor proveedor;
    @OneToMany(mappedBy = "ordenCompra", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<DetalleOrden> detallesOrden;
}
