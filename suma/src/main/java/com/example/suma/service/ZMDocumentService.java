package com.example.suma.service;

import com.example.suma.entity.Basket;
import com.example.suma.entity.WMDocuments;
import com.example.suma.entity.ZMDocument;
import com.example.suma.repository.DeliverRepository;
import com.example.suma.repository.ZMDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ZMDocumentService {
    private final ZMDocumentRepository zmDocumentRepository;
    private final WMDocumentsService wmDocumentsService;
    private final DeliverRepository deliverRepository;

    public void create(ZMDocument zmDocument, Basket basket) {
        WMDocuments wmDocuments = new WMDocuments();
        wmDocuments.setWmProductsList(zmDocument.getDocument().getWmProductsList());
        setDeliver(zmDocument);
        zmDocument.setCreateDate(LocalDate.now());
        zmDocument.setUuid(UUID.randomUUID().toString());
        zmDocument = zmDocumentRepository.saveAndFlush(zmDocument);
        zmDocument.setDocument(wmDocumentsService.create(wmDocuments));
        zmDocumentRepository.save(zmDocument);
    }

    private void setDeliver(ZMDocument zmDocument){
        deliverRepository.findDeliverByUuid(zmDocument.getDeliver().getUuid()).ifPresentOrElse(zmDocument::setDeliver
                ,()->{throw new RuntimeException();});
    }
}
