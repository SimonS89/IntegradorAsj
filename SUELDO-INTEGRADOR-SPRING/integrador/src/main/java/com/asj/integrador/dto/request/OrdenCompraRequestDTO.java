package com.asj.integrador.dto.request;

import com.asj.integrador.model.DetalleOrden;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
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
    @NotBlank
    @Pattern(regexp = "^[A-Z]{2}-[A-Z]\\d{4}$", message = "Ingresar formato válido.")
    private String numeroOrden;
    @NotNull
    @Positive
    private Double total;
    @NotBlank
    @Pattern(regexp = "^[A-Za-zÁ-ú\\s]{3,}(?:\\s[A-Za-zÁ-ú\\s]{3,})+$", message = "Debe ingresar un nombre y apellido válido.")
    private String infoRecepcion;
    private String infoAdicional;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaEmision;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaEntrega;
    private List<DetalleOrden> detallesOrden;
}
