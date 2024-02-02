package com.example.suma.mediator;

import com.example.suma.entity.Product;
import com.example.suma.entity.dto.Order;
import com.example.suma.entity.dto.ProductDTO;
import com.example.suma.entity.dto.Sort;
import com.example.suma.service.ProductService;
import com.example.suma.translators.ProductDtoToProduct;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductMediator {


    private final ProductDtoToProduct productDtoToProduct;
    private final ProductService productService;


    public void createProduct(ProductDTO productDTO){
        Product product = productDtoToProduct.toProduct(productDTO);
        productService.create(product);
    }

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productService.getAll();
        return products.stream().map(productDtoToProduct::toProductDTO).collect(Collectors.toList());
    }


    public List<ProductDTO> getProducts(HttpServletResponse response, String search, int page, int limit, Sort sort, Order order, String category, Double priceMin, Double priceMax) {
        List<Product> products = productService.getProducts(search, page, limit, sort, order, category, priceMin, priceMax);
        response.addHeader("X-Total-Count", String.valueOf(productService.totalCountProduct(search, page, limit, sort, order, category, priceMin, priceMax)));
        return products.stream().map(productDtoToProduct::toProductDTO).collect(Collectors.toList());
    }
}
