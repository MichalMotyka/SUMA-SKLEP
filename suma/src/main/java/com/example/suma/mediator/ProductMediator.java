package com.example.suma.mediator;

import com.example.suma.entity.*;
import com.example.suma.entity.dto.Order;
import com.example.suma.entity.dto.ProductDTO;
import com.example.suma.entity.dto.Properties;
import com.example.suma.entity.dto.Sort;
import com.example.suma.exceptions.ProductDontExistException;
import com.example.suma.exceptions.ProductMaxSixPropertiesException;
import com.example.suma.repository.ProductRepository;
import com.example.suma.service.*;
import com.example.suma.translators.ProductDtoToProduct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductMediator {


    @Value("${backend.adres}")
    private String adress;

    private final ProductDtoToProduct productDtoToProduct;
    private final ProductService productService;
    private final BasketService basketService;
    private final WMDocumentsService wmDocumentsService;
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final FtpService ftpService;


    public void createProduct(ProductDTO productDTO){
        if (productDTO.getProperties().size() > 6){
            throw new ProductMaxSixPropertiesException();
        }
        Product product = productDtoToProduct.toProduct(productDTO);
        productService.create(product);
    }

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productService.getAll();
        return products.stream().map(productDtoToProduct::toProductDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> getProducts(HttpServletRequest request,HttpServletResponse response, String search, int page, int limit, Sort sort, Order order, String category, Double priceMin, Double priceMax) {
        List<Product> products = productService.getProducts(search, page, limit, sort, order, category, priceMin, priceMax);
        response.addHeader("X-Total-Count", String.valueOf(productService.totalCountProduct(search, page, limit, sort, order, category, priceMin, priceMax)));
        List<ProductDTO>  productDTOS = products.stream().map(productDtoToProduct::toProductDTO).toList();
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0){
            Arrays.stream(cookies).filter(value -> value.getName().equals("basket-uuid")).findFirst().ifPresent(value->{
                ZMDocument zmDocument = wmDocumentsService.getWMByBasket(basketService.getBasket(value.getValue()));
                if (zmDocument != null && zmDocument.getDocument() != null){
                    zmDocument.getDocument().getWmProductsList().forEach(wmProducts -> {
                        productDTOS.forEach(productDTO -> {
                            productDTO.getImages().replaceAll(s -> adress + "/api/v1/product/image/" + s);
                            productDTO.setMainImg(adress + "/api/v1/product/image/" + productDTO.getMainImg());
                            if(wmProducts.getProduct().getUuid().equals(productDTO.getUuid())){
                                productDTO.setAvailable(productDTO.getAvailable()+wmProducts.getQuantity());
                            }
                        });
                    });
                }
            });
        }
        productDTOS.forEach(productDTO -> {
            productDTO.setMainImg( adress + "/api/v1/product/image/" + productDTO.getMainImg());
        });
        return productDTOS;
    }

    public ProductDTO getAllProductByUuid(String uuid,HttpServletRequest request) {
        try{
            Product product = productService.getProductByUuid(uuid);
            ProductDTO productDTO = productDtoToProduct.toProductDTO(product);
            Cookie[] cookies = request.getCookies();
            if (cookies != null && cookies.length > 0) {
                Arrays.stream(cookies).filter(value -> value.getName().equals("basket-uuid")).findFirst().ifPresent(value -> {
                    ZMDocument zmDocument = wmDocumentsService.getWMByBasket(basketService.getBasket(value.getValue()));
                    if (zmDocument != null && zmDocument.getDocument() != null){
                        zmDocument.getDocument().getWmProductsList().forEach(wmProducts -> {
                            if (wmProducts.getProduct().getUuid().equals(productDTO.getUuid())) {
                                productDTO.setAvailable(productDTO.getAvailable() + wmProducts.getQuantity());
                            }
                        });
                    }
                });
            }
            productDTO.getImages().replaceAll(s -> adress + "/api/v1/product/image/" + s);
            productDTO.setMainImg( adress + "/api/v1/product/image/" + productDTO.getMainImg());
            return productDTO;
        }catch (Exception e){
            throw new ProductDontExistException();
        }
    }

    public ResponseEntity<?> updateProduct(ProductDTO productDTO) {
        Product product = productService.getProductByUuid(productDTO.getUuid());
        product.setActive(false);
        productRepository.save(product);
        if (productDTO.isActive()){
            Product newProduct =  new Product();
            newProduct.setId(0);
            newProduct.setAvailable(product.getAvailable());
            newProduct.setActive(true);
            newProduct.setCount(product.getCount());
            newProduct.setUuid(UUID.randomUUID().toString());
            newProduct.setName(productDTO.getName());
            newProduct.setDescription(productDTO.getDescription());
            newProduct.setPrice(productDTO.getPrice());
            newProduct.setCreateDate(LocalDate.now());
            product.getImages().stream().filter(value-> value.equals(productDTO.getMainImg())).findAny().ifPresentOrElse(value->{
                newProduct.setMainImg(productDTO.getMainImg());
            },()->{throw new ProductDontExistException();});
            newProduct.setImages(product.getImages());
            newProduct.setProperties(product.getProperties());
            newProduct.setCategory(categoryService.getCategoryByUuid(productDTO.getCategory().getUuid()));
            productRepository.save(newProduct);
        }
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    public ResponseEntity<Response> updateProperties(ProductDTO productDTO) {
        Product product = productService.getProductByUuid(productDTO.getUuid());
        product.setProperties(productDTO.getProperties().stream().map(value-> Map.of("name",value.getName(),"value",value.getValue(),"uuid","")).toList());
        productRepository.save(product);
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }

    public ResponseEntity<?> getImage(String uuid) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(ftpService.getFile(uuid).toByteArray(),headers, HttpStatus.OK);
    }

    public ResponseEntity<Response> deleteProduct(String uuid) {
        productRepository.findProductByUuid(uuid).ifPresentOrElse(value->{
            value.setActive(false);
            productRepository.save(value);
        },()->{throw new ProductDontExistException();});
        return ResponseEntity.ok(new Response(Code.SUCCESS));
    }
}
