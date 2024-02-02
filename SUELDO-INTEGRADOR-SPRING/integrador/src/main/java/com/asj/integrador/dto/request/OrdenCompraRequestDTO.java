package com.asj.integrador.dto.request;

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
public class OrdenCompraRequestDTO {
    private String numeroOrden;
    private Double total;
    private String infoRecepcion;
    private String infoAdicional;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaEmision;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaEntrega;
    private List<DetalleOrden> detallesOrden;
}
