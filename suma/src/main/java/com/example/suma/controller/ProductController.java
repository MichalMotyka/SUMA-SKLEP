package com.example.suma.controller;

import com.example.suma.entity.Code;
import com.example.suma.entity.Response;
import com.example.suma.entity.dto.Order;
import com.example.suma.entity.dto.ProductDTO;
import com.example.suma.entity.dto.Sort;
import com.example.suma.exceptions.ProductAlreadyExistException;
import com.example.suma.exceptions.ProductMaxSixPropertiesException;
import com.example.suma.mediator.MediatorImage;
import com.example.suma.mediator.ProductMediator;
import com.example.suma.service.FtpService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/product")
@Tag(name = "Products")
public class ProductController {

    private final ProductMediator productMediator;
    private final MediatorImage mediatorImage;
    private final FtpService ftpService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/create")
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
                                         @RequestParam Sort sort,
                                         @RequestParam Order order,
                                         @RequestParam(required = false) String category,
                                         @RequestParam(required = false) Double price_min,
                                         @RequestParam(required = false) Double price_max,
                                         HttpServletResponse response,
                                         HttpServletRequest request){
        return ResponseEntity.ok(productMediator.getProducts(request,response,search,page,limit,sort,order,category,price_min,price_max));
    }

    @GetMapping("{uuid}")
    public ResponseEntity<ProductDTO> getProductByUuid(@PathVariable String uuid, HttpServletRequest request){
        return ResponseEntity.ok(productMediator.getAllProductByUuid(uuid,request));
    }

    @GetMapping("/image/{uuid}")
    public ResponseEntity<?> getImageByUuid(@PathVariable String uuid) throws IOException {
        return productMediator.getImage(uuid);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("{productUuid}/image")
    public ResponseEntity<?> saveFile(@RequestParam("image") MultipartFile multipartFile, @PathVariable("productUuid") String uuid){
        return mediatorImage.saveImage(multipartFile,uuid);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("{productUuid}/image/{image}")
    public ResponseEntity<?> deleteFile(@PathVariable("image") String image, @PathVariable("productUuid") String uuid){
        return mediatorImage.delete(image,uuid);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping()
    public ResponseEntity<?> updateProduct(@RequestBody ProductDTO productDTO){
        return productMediator.updateProduct(productDTO);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PatchMapping()
    public ResponseEntity<Response> updateProductProperties(@RequestBody ProductDTO productDTO){
        return productMediator.updateProperties(productDTO);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Response> deleteProduct(@PathVariable String uuid){
        return productMediator.deleteProduct(uuid);
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ProductMaxSixPropertiesException.class)
    public Response handleProductMaxSixPropertiesException(
            ProductMaxSixPropertiesException ex) {
        return new Response(Code.P1);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ProductAlreadyExistException.class)
    public Response handleProductAlreadyExistException(
            ProductAlreadyExistException ex) {
        return new Response(Code.P2);
    }

}
