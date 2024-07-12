package com.example.suma.service;

import com.example.suma.entity.PMDocument;
import com.example.suma.entity.PMProducts;
import com.example.suma.entity.State;
import com.example.suma.exceptions.PMDontExist;
import com.example.suma.repository.PMDocumentRepository;
import com.example.suma.repository.PMProductRepository;
import com.example.suma.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PMDocumentService {
    private final PMDocumentRepository pmDocumentRepository;
    private final PMProductRepository pmProductRepository;
    private final ProductRepository productRepository;

    public PMDocument save(PMDocument pmDocument) {
        pmDocument.setUuid(UUID.randomUUID().toString());
        pmDocument.setState(State.PROJECT);
        pmDocument.setCreateDate(LocalDate.now());
        PMDocument createdDocument =  pmDocumentRepository.saveAndFlush(pmDocument);
        pmDocument.getPmProductsList().forEach(value->{
            value.setPmDocuments(createdDocument);
            pmProductRepository.save(value);
        });
        return createdDocument;
    }

    public List<PMDocument> findAllByName(String name) {
        if (name != null) {
            return pmDocumentRepository.findAllByUuid(name);
        }
            return pmDocumentRepository.findAll();
    }

    public List<PMDocument> findAllByStatusAndName(State state, String name) {
        if (name != null){
            return pmDocumentRepository.findAllByUuidAndState(name,state);
        }
        return pmDocumentRepository.findAllByState(state);
    }

    public PMDocument findByUuid(String uuid) {
        return pmDocumentRepository.findByUuid(uuid).orElseThrow(()->new PMDontExist("Dokument nie istnieje"));
    }

    public void addProducts(PMDocument pmDocument) {
        pmDocument.getPmProductsList().forEach(pmProducts -> {
            pmProducts.getProduct().setAvailable(pmProducts.getProduct().getAvailable()+pmProducts.getQuantity());
            pmProducts.getProduct().setCount(pmProducts.getProduct().getCount()+pmProducts.getQuantity());
            productRepository.save(pmProducts.getProduct());
        });
    }
}
