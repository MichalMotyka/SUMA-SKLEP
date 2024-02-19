package com.example.suma.controller;

import com.example.suma.entity.dto.OrderDTO;
import com.example.suma.mediator.DocumentsMediator;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/document")
@Tag(name = "Documents")
public class DocumentsController {

    private final DocumentsMediator documentsMediator;

    @PostMapping("create/order")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO){
        documentsMediator.createOrder(orderDTO);
        return ResponseEntity.ok("");
    }
}
