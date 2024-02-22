package com.example.suma.controller;

import com.example.suma.entity.Code;
import com.example.suma.entity.Response;
import com.example.suma.entity.dto.OrderDTO;
import com.example.suma.exceptions.EmptyBasketException;
import com.example.suma.exceptions.UuidNullException;
import com.example.suma.mediator.DocumentsMediator;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/document")
@Tag(name = "Documents")
public class DocumentsController {

    private final DocumentsMediator documentsMediator;

    @PostMapping("order")
    public ResponseEntity<?> makeOrder(HttpServletRequest request, HttpServletResponse response){
        documentsMediator.makeOrder(request.getCookies(),response);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @PostMapping("create/order")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO, HttpServletRequest request){
        documentsMediator.createOrder(orderDTO,request.getCookies());
        return ResponseEntity.ok("");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(EmptyBasketException.class)
    public Response handleEmptyBasketException(
            EmptyBasketException ex) {
        return new Response(Code.B3);
    }
}
