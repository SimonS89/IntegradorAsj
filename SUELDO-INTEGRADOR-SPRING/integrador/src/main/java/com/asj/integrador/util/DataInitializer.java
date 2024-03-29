package com.asj.integrador.util;

import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private final PaisService paisService;
    private final TipoIvaService tipoIvaService;
    private final RubroService rubroService;
    private final CategoriaService categoriaService;
    private final RolUsuarioService rolService;
    private final EmailService emailService;
    private final UsuarioService usuarioService;
    Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    public DataInitializer(PaisService paisService, TipoIvaService tipoIvaService, RubroService rubroService, CategoriaService categoriaService, RolUsuarioService rolService, EmailService emailService, UsuarioService usuarioService) {
        this.paisService = paisService;
        this.tipoIvaService = tipoIvaService;
        this.rubroService = rubroService;
        this.categoriaService = categoriaService;
        this.rolService = rolService;
        this.emailService = emailService;
        this.usuarioService = usuarioService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void dataInitializer() throws ResourceNotFoundException {
        logger.info("Inicializando aplicacion, llenando BD");
        logger.info("Creando paises y provincias");
        paisService.crearPaises();
        logger.info("Creando tipos de iva");
        tipoIvaService.defaultTiposIva();
        logger.info("Creando rubros");
        rubroService.defaultData();
        logger.info("Creando categorias");
        categoriaService.defaultData();
        logger.info("Creando Roles de usuario");
        rolService.defaultData();
        logger.info("Creando usuario Admin");
        usuarioService.defaultAdmin();
    }
}
