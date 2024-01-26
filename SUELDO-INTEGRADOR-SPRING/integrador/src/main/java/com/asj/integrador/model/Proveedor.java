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
@Table(name = "proveedores")
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String codigo;
    private String logo;
    private String razonSocial;
    private String telefono;
    private String email;
    @Column(unique=true)
    private String cuit;
    private String sitioWeb;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_iva_id", referencedColumnName = "id", nullable = false)
    private TipoIva tipoIva;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rubro_id", referencedColumnName = "id", nullable = false)
    private Rubro rubro;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "domicilio_id", referencedColumnName = "id")
    private Domicilio domicilio;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "representante_contacto_id", referencedColumnName = "id")
    private RepresentanteContacto representanteContacto;
    @UpdateTimestamp
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaActualizacionRegistro;
    @CreationTimestamp
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaCreacionRegistro;
    private boolean eliminado;
}
