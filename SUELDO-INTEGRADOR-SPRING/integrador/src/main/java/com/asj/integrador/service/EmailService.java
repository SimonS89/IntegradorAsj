package com.asj.integrador.service;

import com.asj.integrador.exception.ResourceNotFoundException;

public interface EmailService {
    String sendMail(String to, String subject, String body) throws ResourceNotFoundException;
}
