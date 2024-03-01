package com.example.suma.mediator;

import com.example.suma.entity.Product;
import com.example.suma.entity.dto.Order;
import com.example.suma.entity.dto.ProductDTO;
import com.example.suma.entity.dto.Sort;
import com.example.suma.exceptions.ProductDontExistException;
import com.example.suma.exceptions.ProductMaxSixPropertiesException;
import com.example.suma.service.BasketService;
import com.example.suma.service.ProductService;
import com.example.suma.service.WMDocumentsService;
import com.example.suma.translators.ProductDtoToProduct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductMediator {


    private final ProductDtoToProduct productDtoToProduct;
    private final ProductService productService;
    private final BasketService basketService;
    private final WMDocumentsService wmDocumentsService;


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
                wmDocumentsService.getWMByBasket(basketService.getBasket(value.getValue())).getDocument().getWmProductsList().forEach(wmProducts -> {
                    productDTOS.forEach(productDTO -> {
                        if(wmProducts.getProduct().getUuid().equals(productDTO.getUuid())){
                            productDTO.setAvailable(productDTO.getAvailable()+wmProducts.getQuantity());
                        }
                    });
                });
            });
        }
        return productDTOS;
    }

    public ProductDTO getAllProductByUuid(String uuid,HttpServletRequest request) {
        try{
            Product product = productService.getProductByUuid(uuid);
            ProductDTO productDTO = productDtoToProduct.toProductDTO(product);
            Cookie[] cookies = request.getCookies();
            if (cookies != null && cookies.length > 0) {
                Arrays.stream(cookies).filter(value -> value.getName().equals("basket-uuid")).findFirst().ifPresent(value -> {
                    wmDocumentsService.getWMByBasket(basketService.getBasket(value.getValue())).getDocument().getWmProductsList().forEach(wmProducts -> {
                        if (wmProducts.getProduct().getUuid().equals(productDTO.getUuid())) {
                            productDTO.setAvailable(productDTO.getAvailable() + wmProducts.getQuantity());
                        }
                    });
                });
            }
            return productDTO;
        }catch (Exception e){
            throw new ProductDontExistException();
        }
    }
}
