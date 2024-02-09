package com.asj.integrador.service;

import com.asj.integrador.exception.ResourceNotFoundException;

public interface EmailService {
    String enviarMail(String to, String subject, String body) throws ResourceNotFoundException;

    String msgBienvenida(String username);

    String msgRecuperarContrasenia(String username,String hashedUsername);

    String msgResetearContrasenia(String username, String newPassword);

    String actualizarContrasenia(String username);
}
