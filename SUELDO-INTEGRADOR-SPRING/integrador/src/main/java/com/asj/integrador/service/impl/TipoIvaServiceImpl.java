package com.asj.integrador.service.impl;

import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.TipoIva;
import com.asj.integrador.repository.TipoIvaRepository;
import com.asj.integrador.service.TipoIvaService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TipoIvaServiceImpl implements TipoIvaService {

    private final TipoIvaRepository tipoIvaRepository;

    public TipoIvaServiceImpl(TipoIvaRepository tipoIvaRepository) {
        this.tipoIvaRepository = tipoIvaRepository;
    }

    public void defaultTiposIva() {
        if (tipoIvaRepository.count() == 0)
            tipoIvaRepository.saveAll(Arrays.asList(new TipoIva("Responsable Inscripto"), new TipoIva("Monotributista"), new TipoIva("Exento"), new TipoIva("Consumidor Final")));
    }

    public List<TipoIva> findAll() throws ResourceNotFoundException {
        List<TipoIva> tipoIvas = tipoIvaRepository.findAll();
        if (tipoIvas.isEmpty()) throw new ResourceNotFoundException("No hay categorias disponibles");
        return tipoIvas;
    }
}
