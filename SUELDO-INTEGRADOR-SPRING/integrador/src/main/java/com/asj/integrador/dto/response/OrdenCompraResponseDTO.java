package com.asj.integrador.dto.response;

import com.asj.integrador.model.DetalleOrden;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrdenCompraResponseDTO {
    private long id;
    private String numeroOrden;
    private Double total;
    private String infoRecepcion;
    private String infoAdicional;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate fechaEmision;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate fechaEntrega;
    private List<DetalleOrdenResponseDTO> detallesOrden;
    private ProveedorResponseDTO proveedor;
    private Boolean activa;
}
