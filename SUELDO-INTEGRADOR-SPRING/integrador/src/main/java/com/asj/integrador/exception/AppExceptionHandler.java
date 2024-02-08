package com.asj.integrador.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class AppExceptionHandler {

    private static final String ACCESS_DENIED = "access_denied_reason";
    private static final String ERROR_MESSAGE = "errorMessage";

    private static String bdUniqueMsg(String errorMessage) {
        String customErrorMessage = "";
        if (errorMessage.contains("CUIT")) {
            customErrorMessage = "El CUIT del proveedor debe ser único. Por favor, elija otro CUIT.";
        } else if (errorMessage.contains("CODIGO")) {
            customErrorMessage = "El código del proveedor debe ser único. Por favor, elija otro código.";
        }
        return customErrorMessage;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleInvalidArguments(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> resourceNotFound(ResourceNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put(ERROR_MESSAGE, ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> alreadyExists(AlreadyExistsException ex) {
        Map<String, String> error = new HashMap<>();
        error.put(ERROR_MESSAGE, ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> uniqueException(DataIntegrityViolationException ex) {
        String errorMessage = ex.getRootCause().getMessage();
        String customErrorMessage = bdUniqueMsg(errorMessage);

        Map<String, String> error = new HashMap<>();
        error.put(ERROR_MESSAGE, customErrorMessage);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleSecurityException(Exception ex) {
        ProblemDetail errorDetail = null;
        if (ex instanceof BadCredentialsException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), ex.getMessage());
            errorDetail.setProperty(ACCESS_DENIED, "Authentication Failure");
        }
        if (ex instanceof AccessDeniedException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
            errorDetail.setProperty(ACCESS_DENIED, "not_authorized!");
        }
        if (ex instanceof SignatureException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
            errorDetail.setProperty(ACCESS_DENIED, "JWT signature not valid!");
        }
        if (ex instanceof ExpiredJwtException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
            errorDetail.setProperty(ACCESS_DENIED, "JWT token alredy expired!");
        }
        return errorDetail;
    }
}
