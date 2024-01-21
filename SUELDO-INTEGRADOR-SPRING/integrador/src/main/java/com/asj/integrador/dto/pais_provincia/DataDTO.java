package com.asj.integrador.dto.pais_provincia;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DataDTO {
    private List<ProvinciasDTO> provincias;
}
