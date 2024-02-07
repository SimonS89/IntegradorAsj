package com.asj.integrador.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DashboardResponseDTO {

    private int cantProveedores;
    private int provCreadosUltimoMes;
    private int cantProductos;
    private int prodCreadosUltimoMes;
    private int cantOrdenesCompra;
    private double ticketPromedio;
    private double prodPromedioTicket;

}
