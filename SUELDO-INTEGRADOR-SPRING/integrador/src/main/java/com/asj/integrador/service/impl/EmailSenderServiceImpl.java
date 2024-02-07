package com.asj.integrador.service.impl;

import com.asj.integrador.exception.ResourceNotFoundException;
import com.asj.integrador.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailSenderServiceImpl implements EmailService {

    @Value("${spring.mail.username}")
    private String emailDesde;
    private final JavaMailSender mailSender;

    public EmailSenderServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public String sendMail(String to, String subject, String body) throws ResourceNotFoundException {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(emailDesde);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body);
            mailSender.send(mimeMessage);
        } catch (Exception ex) {
            throw new ResourceNotFoundException(ex.getMessage());
        }
        return "Email enviado con exito";
    }
}
