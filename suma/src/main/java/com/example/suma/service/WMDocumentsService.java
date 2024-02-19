package com.example.suma.service;

import com.example.suma.entity.Product;
import com.example.suma.entity.State;
import com.example.suma.entity.WMDocuments;
import com.example.suma.entity.WMProducts;
import com.example.suma.repository.WMDocumentsRepository;
import com.example.suma.repository.WMProductsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WMDocumentsService{
    private final WMDocumentsRepository wmDocumentsRepository;
    private final WMProductsRepository wmProductsRepository;
    private final ProductService productService;

    public WMDocuments create(WMDocuments document) {
        document.setCreateDate(LocalDate.now());
        document.setUuid(UUID.randomUUID().toString());
        document.setState(State.PROJECT);
        document = wmDocumentsRepository.saveAndFlush(document);
        WMDocuments finalDocument = document;
        document.getWmProductsList().forEach(value-> addProduct(value, finalDocument));
        return document;
    }

    private void addProduct(WMProducts wmProducts,WMDocuments wmDocuments){
        Product product = productService.getProductByUuid(wmProducts.getProduct().getUuid());
        wmProducts.setUuid(UUID.randomUUID().toString());
        wmProducts.setProduct(product);
        wmProducts.setWmDocuments(wmDocuments);
        wmProductsRepository.save(wmProducts);
    }
}
