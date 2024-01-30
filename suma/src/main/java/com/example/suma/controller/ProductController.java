package com.example.suma.controller;

import com.example.suma.entity.Code;
import com.example.suma.entity.Response;
import com.example.suma.entity.dto.ProductDTO;
import com.example.suma.mediator.ProductMediator;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/product")
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600,allowCredentials="true")
@Tag(name = "Products")
public class ProductController {

    private final ProductMediator productMediator;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Response> createProduct(@RequestBody ProductDTO productDTO){
        productMediator.createProduct(productDTO);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ProductDTO>> getAllProducts(){
        return ResponseEntity.ok(productMediator.getAllProducts());
    }

    @GetMapping()
    public ResponseEntity<?> getProducts(@RequestParam(required = false) String search,
                                         @RequestParam int page,
                                         @RequestParam int limit,
                                         @RequestParam String sort,
                                         @RequestParam String order,
                                         @RequestParam(required = false) String category,
                                         @RequestParam(required = false) Double price_min,
                                         @RequestParam(required = false) Double price_max){
        return ResponseEntity.ok(productMediator.getProducts(search,page,limit,sort,order,category,price_min,price_max));
    }

}
