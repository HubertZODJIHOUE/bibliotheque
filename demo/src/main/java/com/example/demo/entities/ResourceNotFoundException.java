package com.example.demo.entities;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends  Throwable {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
