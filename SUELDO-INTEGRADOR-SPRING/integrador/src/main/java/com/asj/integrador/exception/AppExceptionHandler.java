package com.asj.integrador.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class AppExceptionHandler {

    private static final String ACCESS_DENIED = "access_denied_reason";

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleInvalidArguments(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return errors;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public Map<String, String> resourceNotFound(ResourceNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("errorMesage", ex.getMessage());
        return error;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(AlreadyExistsException.class)
    public Map<String, String> alreadyExists(AlreadyExistsException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("errorMesage", ex.getMessage());
        return error;
    }

//    @ExceptionHandler(Exception.class)
//    public ProblemDetail handleSecurityException(Exception ex) {
//        ProblemDetail errorDetail = null;
//        if (ex instanceof BadCredentialsException) {
//            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), ex.getMessage());
//            errorDetail.setProperty(ACCESS_DENIED, "Authentication Failure");
//        }
//        if (ex instanceof AccessDeniedException) {
//            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
//            errorDetail.setProperty(ACCESS_DENIED, "not_authorized!");
//        }
//        if (ex instanceof SignatureException) {
//            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
//            errorDetail.setProperty(ACCESS_DENIED, "JWT signature not valid!");
//        }
//        if (ex instanceof ExpiredJwtException) {
//            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
//            errorDetail.setProperty(ACCESS_DENIED, "JWT token alredy expired!");
//        }
//        return errorDetail;
//    }
}
