package com.example.suma.controller;

import com.example.suma.entity.Code;
import com.example.suma.entity.Response;
import com.example.suma.entity.dto.DeliverDTO;
import com.example.suma.entity.dto.DocumentDTO;
import com.example.suma.entity.dto.OrderDTO;
import com.example.suma.entity.notify.*;
import com.example.suma.exceptions.*;
import com.example.suma.mediator.DocumentsMediator;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/document")
@Tag(name = "Documents")
public class DocumentsController {

    private final DocumentsMediator documentsMediator;

    @GetMapping("order/info/{order}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable String order){
        return ResponseEntity.ok(documentsMediator.getOrderInfo(order));
    }

    @PostMapping("order")
    public ResponseEntity<Response> makeOrder(HttpServletRequest request, HttpServletResponse response){
        documentsMediator.makeOrder(request.getCookies(),response);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @PatchMapping("order/deliver/{order}")
    public ResponseEntity<OrderDTO> setDeliverOrder(@RequestBody DeliverDTO deliverDTO,@PathVariable String order){
        return ResponseEntity.ok(documentsMediator.setDeliver(deliverDTO,order));
    }

    @PatchMapping("order")
    public ResponseEntity<Response> setDataOrder(@RequestBody OrderDTO orderDTO,HttpServletRequest request,HttpServletResponse response) throws URISyntaxException {
        documentsMediator.setDataOrder(orderDTO,request,response);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @PostMapping("create/order")
    public ResponseEntity<Response> createOrder(@RequestBody OrderDTO orderDTO, HttpServletRequest request){
        documentsMediator.createOrder(orderDTO,request.getCookies());
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @RequestMapping(method = RequestMethod.POST,value = "/notification")
    public ResponseEntity<Response> notifyOrder(@RequestBody String notify, HttpServletRequest request){
        return documentsMediator.handleNotify(notify,request);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(EmptyBasketException.class)
    public Response handleEmptyBasketException(
            EmptyBasketException ex) {
        return new Response(Code.B3);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NoEnoughProductException.class)
    public Response handleNoEnoughProductException(NoEnoughProductException ex){
        return new Response(Code.B2);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(OrderDontExistException.class)
    public Response handleNoEnoughProductException(OrderDontExistException ex){
        return new Response(Code.O1);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DeliverDontExistException.class)
    public Response handleNoEnoughProductException(DeliverDontExistException ex){
        return new Response(Code.D1);
    }
}
