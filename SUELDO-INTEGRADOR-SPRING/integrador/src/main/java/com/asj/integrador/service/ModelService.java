package com.asj.integrador.service;

import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ModelService<T,K> {
    K create(T t) throws AlreadyExistsException;

    K findById(Long id) throws ResourceNotFoundException;

    List<K> findAll() throws ResourceNotFoundException;

    K update(long id,T t) throws ResourceNotFoundException;

    void delete(Long id) throws ResourceNotFoundException;

    void softDelete(Long id) throws ResourceNotFoundException;
}
