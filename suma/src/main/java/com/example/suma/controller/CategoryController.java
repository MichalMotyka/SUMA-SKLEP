package com.example.suma.controller;

import com.example.suma.entity.Code;
import com.example.suma.entity.Response;
import com.example.suma.entity.dto.CategoryDTO;
import com.example.suma.exceptions.CategoryAlreadyExistException;
import com.example.suma.exceptions.CategoryDontExistException;
import com.example.suma.exceptions.SupercategoryDontExistException;
import com.example.suma.exceptions.SupercategoryNotEmptyException;
import com.example.suma.mediator.CategoryMediator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryMediator categoryMediator;

    @PostMapping
    public ResponseEntity<Response> createCategory(@Valid @RequestBody CategoryDTO category){
        categoryMediator.createCategory(category);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @GetMapping("{uuid}")
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable String uuid){
       return ResponseEntity.ok(categoryMediator.getCategory(uuid));
    }

    @PatchMapping()
    public ResponseEntity<Response> updateCategory(@RequestBody CategoryDTO categoryDTO){
        categoryMediator.updateCategory(categoryDTO);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Response handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        StringBuilder message = new StringBuilder("Przekazane dane są nieprawidłowe: \n");
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            message.append(error.getDefaultMessage()).append("\n");
        });
        return new Response(message.toString(), Code.E1);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CategoryDontExistException.class)
    public Response handleCategoryDontExistException(
            CategoryDontExistException ex) {
        return new Response(Code.C1);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CategoryAlreadyExistException.class)
    public Response handleCategoryAlreadyExistException(
            CategoryAlreadyExistException ex) {
        return new Response(Code.C2);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SupercategoryDontExistException.class)
    public Response handleSupercategoryDontExistException(
            SupercategoryDontExistException ex) {
        return new Response(Code.C3);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SupercategoryNotEmptyException.class)
    public Response handleSupercategoryNotEmptyException(
            SupercategoryNotEmptyException ex) {
        return new Response(Code.C4);
    }
}
