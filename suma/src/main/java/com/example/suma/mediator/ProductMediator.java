package com.example.suma.mediator;

import com.example.suma.entity.Product;
import com.example.suma.entity.dto.ProductDTO;
import com.example.suma.service.ProductService;
import com.example.suma.translators.ProductDtoToProduct;
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


    public List<ProductDTO> getProducts(String search, int page, int limit, String sort, String order, String category, Double priceMin, Double priceMax) {
        List<Product> products = productService.getProducts(search, page, limit, sort, order, category, priceMin, priceMax);
        return products.stream().map(productDtoToProduct::toProductDTO).collect(Collectors.toList());
    }
}
