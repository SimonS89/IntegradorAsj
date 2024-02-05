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
    public CategoriaResponseDTO crear(CategoriaRequestDTO categoriaRequestDTO) throws AlreadyExistsException {
        Optional<Categoria> categoriaEncontrada = categoriaRepository.findByCategoriaIgnoreCase(categoriaRequestDTO.getCategoria());
        if (categoriaEncontrada.isPresent()) {
            if (!categoriaEncontrada.get().isEliminado()) throw new AlreadyExistsException("Categoria existente");
            else {
                Categoria categoria = categoriaEncontrada.get();
                categoria.setEliminado(false);
                return mapper.map(categoriaRepository.save(categoria), CategoriaResponseDTO.class);
            }
        }
        Categoria categoria = mapper.map(categoriaRequestDTO, Categoria.class);
        return mapper.map(categoriaRepository.save(categoria), CategoriaResponseDTO.class);
    }

    @Override
    public CategoriaResponseDTO buscarPorId(Long id) throws ResourceNotFoundException {
        return mapper.map(obtenerCategoriaSiExiste(id), CategoriaResponseDTO.class);
    }

    @Override
    public Categoria buscarPorIdInterno(long id) throws ResourceNotFoundException {
        return categoriaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada"));
    }

    @Override
    public List<CategoriaResponseDTO> listarTodo() throws ResourceNotFoundException {
        List<Categoria> categoriasEncontradas = categoriaRepository.findAll();
        if (categoriasEncontradas.isEmpty()) throw new ResourceNotFoundException("No hay categorias disponibles");

        return categoriasEncontradas.stream().map(cat -> mapper.map(cat, CategoriaResponseDTO.class)).toList();
    }

    @Override
    public List<CategoriaResponseDTO> listarCategoriasFiltradas(boolean eliminados) throws ResourceNotFoundException {
        List<Categoria> categorias = categoriaRepository.findByEliminado(eliminados);
        if (categorias.isEmpty()) throw new ResourceNotFoundException("No hay proveedores.");
        return categorias.stream().map(categoria -> mapper.map(categoria, CategoriaResponseDTO.class)).toList();
    }

    @Override
    public CategoriaResponseDTO actualizar(long id, CategoriaRequestDTO categoriaRequestDTO) throws ResourceNotFoundException, AlreadyExistsException {
        obtenerCategoriaSiExiste(id);
        Optional<Categoria> categoriaEncontrada = categoriaRepository.findByCategoriaIgnoreCase(categoriaRequestDTO.getCategoria());
        if(categoriaEncontrada.isPresent())throw new AlreadyExistsException("Categoria existente");
        Categoria categoriaActualizada = mapper.map(categoriaRequestDTO, Categoria.class);
        categoriaActualizada.setId(id);
        return mapper.map(categoriaRepository.save(categoriaActualizada), CategoriaResponseDTO.class);
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        obtenerCategoriaSiExiste(id);
        categoriaRepository.deleteById(id);
    }

    @Override
    public void eliminadoLogico(Long id) throws ResourceNotFoundException, AlreadyExistsException {
        Categoria categoria = obtenerCategoriaSiExiste(id);
        if (categoriaRepository.countProductosByCategoriaId(id) > 0)
            throw new AlreadyExistsException("La categoria tiene productos asociados.");
        categoria.setEliminado(!categoria.isEliminado());
        categoriaRepository.save(categoria);
    }

    private Categoria obtenerCategoriaSiExiste(Long id) throws ResourceNotFoundException {
        return categoriaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada"));
    }

    @Override
    public void defaultData() {
        if (categoriaRepository.count() == 0) {
            List<String> categorias = new ArrayList<>(Arrays.asList("Libros", "Cursos", "Ropa", "Calzado", "Suplementos", "Equipamiento", "Productos orgánicos", "Snacks saludables", "Dispositivos móviles", "Computadoras"));
            categoriaRepository.saveAll(categorias.stream().map(Categoria::new).toList());
        }
    }
}
