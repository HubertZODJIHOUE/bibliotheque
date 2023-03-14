package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/exo")
public class testcontroller {

    @GetMapping("/test")
    public String getDatat(){
        return "datata is corercete in this test";
    }
}
