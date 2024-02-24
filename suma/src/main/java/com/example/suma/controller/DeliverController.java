package com.example.suma.controller;

import com.example.suma.entity.dto.DeliverDTO;
import com.example.suma.mediator.DeliverMediator;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/deliver")
@RequiredArgsConstructor
@Tag(name = "Deliver")
public class DeliverController {

    private final DeliverMediator deliverMediator;

    @GetMapping
    public ResponseEntity<List<DeliverDTO>> getDeliver(){
        return ResponseEntity.ok(deliverMediator.getDeliver());
    }
}
