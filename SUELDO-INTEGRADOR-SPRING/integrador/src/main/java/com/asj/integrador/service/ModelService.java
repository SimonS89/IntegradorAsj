package com.asj.integrador.service;

import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;

import java.util.List;

public interface ModelService<T, K> {
    void defaultData();

    K crear(T t) throws AlreadyExistsException;

    K buscarPorId(Long id) throws ResourceNotFoundException;

    List<K> listarTodo() throws ResourceNotFoundException;

    K actualizar(long id, T t) throws ResourceNotFoundException, AlreadyExistsException;

    void eliminar(Long id) throws ResourceNotFoundException;

    void eliminadoLogico(Long id) throws ResourceNotFoundException, AlreadyExistsException;
}
