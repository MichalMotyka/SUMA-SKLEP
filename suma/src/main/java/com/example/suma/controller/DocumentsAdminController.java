package com.example.suma.controller;

import com.example.suma.entity.Code;
import com.example.suma.entity.Response;
import com.example.suma.entity.State;
import com.example.suma.entity.dto.DocumentDTO;
import com.example.suma.entity.dto.OrderDTO;
import com.example.suma.exceptions.EmptyBasketException;
import com.example.suma.exceptions.NoEnoughProductException;
import com.example.suma.exceptions.OrderDontExistException;
import com.example.suma.exceptions.PMDontExist;
import com.example.suma.mediator.DocumentsMediator;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin/document")
@Tag(name = "DocumentsAdmin")
public class DocumentsAdminController {

    private final DocumentsMediator documentsMediator;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("create/document")
    public ResponseEntity<Response> createDocument(@RequestBody DocumentDTO documentDTO){
        documentsMediator.createDocument(documentDTO);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("get/document")
    public ResponseEntity<List<DocumentDTO>> getDocuments(@RequestParam String all,@RequestParam(required = false) String name){
        List<DocumentDTO> documents = documentsMediator.getAllDocuments(all,name);
        return ResponseEntity.ok(documents);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PatchMapping("state/document/{uuid}")
    public ResponseEntity<Response> updateDocument(@PathVariable String uuid){
        documentsMediator.updateDocument(uuid,State.COMPLETED);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("state/document/{uuid}")
    public ResponseEntity<Response> deleteDocument(@PathVariable String uuid){
        documentsMediator.updateDocument(uuid, State.REJECTED);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("get/orders")
    public ResponseEntity<List<OrderDTO>> getOrders(@RequestParam String all, @RequestParam(required = false) String name){
        List<OrderDTO> documents = documentsMediator.getAllOrders(all,name);
        return ResponseEntity.ok(documents);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PatchMapping("send/message/orders")
    public ResponseEntity<Response> sendMessage(@RequestBody OrderDTO orderDTO){
        documentsMediator.sendMessage(orderDTO);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PatchMapping("status/orders")
    public ResponseEntity<Response> changeStatus(@RequestBody OrderDTO orderDTO){
        documentsMediator.changeStatus(orderDTO);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(PMDontExist.class)
    public Response handlePMDontExistException(
            PMDontExist ex) {
        return new Response(ex.getMessage(),Code.E1);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(OrderDontExistException.class)
    public Response handleOrderDontExistException(
            OrderDontExistException ex) {
        return new Response(ex.getMessage(),Code.E1);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NoEnoughProductException.class)
    public Response handleNoEnoughProductExceptionException(
            NoEnoughProductException ex) {
        return new Response("Brak wystarczającej liczby produktu",Code.E1);
    }
}
