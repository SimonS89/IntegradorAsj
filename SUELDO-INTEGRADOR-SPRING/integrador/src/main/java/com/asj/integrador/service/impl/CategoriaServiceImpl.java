package com.asj.integrador.service.impl;

import com.asj.integrador.dto.request.CategoriaRequestDTO;
import com.asj.integrador.dto.response.CategoriaResponseDTO;
import com.asj.integrador.exception.AlreadyExistsException;
import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.model.Categoria;
import com.asj.integrador.repository.CategoriaRepositroy;
import com.asj.integrador.service.CategoriaService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepositroy categoriaRepository;
    private final ModelMapper mapper;
    private final Logger logger = LoggerFactory.getLogger(CategoriaServiceImpl.class);

    public CategoriaServiceImpl(CategoriaRepositroy categoriaRepository, ModelMapper mapper) {
        this.categoriaRepository = categoriaRepository;
        this.mapper = mapper;
    }

    @Override
    public void defaultData() {
        if (categoriaRepository.count() == 0) {
            List<String> categorias = new ArrayList<>(Arrays.asList("Libros", "Cursos", "Ropa", "Calzado", "Suplementos", "Equipamiento", "Productos orgánicos", "Snacks saludables", "Dispositivos móviles", "Computadoras"));
            categoriaRepository.saveAll(categorias.stream().map(Categoria::new).toList());
        }
    }

    @Override
    public CategoriaResponseDTO create(CategoriaRequestDTO categoriaRequestDTO) throws AlreadyExistsException {
        Optional<Categoria> categoriaEncontrada = categoriaRepository.findByCategoria(categoriaRequestDTO.getCategoria());
        if (categoriaEncontrada.isPresent()) throw new AlreadyExistsException("Categoria existente");
        Categoria categoria = mapper.map(categoriaRequestDTO, Categoria.class);
        return mapper.map(categoriaRepository.save(categoria), CategoriaResponseDTO.class);
    }

    @Override
    public CategoriaResponseDTO findById(Long id) throws ResourceNotFoundException {
        return mapper.map(getCategoriaIfExists(id), CategoriaResponseDTO.class);
    }

    @Override
    public List<CategoriaResponseDTO> findAll() throws ResourceNotFoundException {
        List<Categoria> categoriasEncontradas = categoriaRepository.findAll();
        if (categoriasEncontradas.isEmpty()) throw new ResourceNotFoundException("No hay categorias disponibles");
        return categoriasEncontradas.stream().map(cat -> mapper.map(cat, CategoriaResponseDTO.class)).toList();
    }

    @Override
    public CategoriaResponseDTO update(long id, CategoriaRequestDTO categoriaRequestDTO) throws ResourceNotFoundException {
        getCategoriaIfExists(id);
        Categoria categoriaActualizada = mapper.map(categoriaRequestDTO, Categoria.class);
        categoriaActualizada.setId(id);
        return mapper.map(categoriaRepository.save(categoriaActualizada), CategoriaResponseDTO.class);
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        getCategoriaIfExists(id);
        categoriaRepository.deleteById(id);
    }

    @Override
    public void softDelete(Long id) throws ResourceNotFoundException {
        Categoria categoria = getCategoriaIfExists(id);
        categoria.setEstaEliminado(true);
        categoriaRepository.save(categoria);
    }

    private Categoria getCategoriaIfExists(Long id) throws ResourceNotFoundException {
        return categoriaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada"));
    }
}
