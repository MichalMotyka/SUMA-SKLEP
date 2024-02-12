package com.example.suma.controller;

import com.example.suma.entity.BasketItem;
import com.example.suma.entity.Code;
import com.example.suma.entity.Response;
import com.example.suma.entity.dto.BasketItemDTO;
import com.example.suma.mediator.BasketMediator;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/basket")
@RequiredArgsConstructor
@Tag(name = "Basket")
public class BasketController {

    private final BasketMediator basketMediator;

    @GetMapping()
    public ResponseEntity<?> getBasket(HttpServletResponse response, HttpServletRequest request){
        return ResponseEntity.ok(basketMediator.getBasket(response,request));
    }

    @PatchMapping
    public ResponseEntity<?> editBasketItems(@RequestBody BasketItemDTO basketItem, HttpServletResponse response, HttpServletRequest request){
        basketMediator.editBasket(basketItem,response,request);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }
}
