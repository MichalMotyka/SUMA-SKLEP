package com.example.suma.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/product")
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600,allowCredentials="true")
@Tag(name = "Auth")
public class ProductController {


    public ResponseEntity<?> createProduct(){
        return null;
    }
}
