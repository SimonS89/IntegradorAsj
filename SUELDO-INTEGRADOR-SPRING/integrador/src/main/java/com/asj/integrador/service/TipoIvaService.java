package com.asj.integrador.service;

import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.TipoIva;

import java.util.List;

public interface TipoIvaService {
    void defaultTiposIva();

    List<TipoIva> listarTodo() throws ResourceNotFoundException;

    TipoIva buscarPorId(long id) throws ResourceNotFoundException;
}
