package com.example.suma.service;

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

    public void create(ZMDocument zmDocument) {
        setDeliver(zmDocument);
        zmDocument.setCreateDate(LocalDate.now());
        zmDocument.setUuid(UUID.randomUUID().toString());
        zmDocument = zmDocumentRepository.saveAndFlush(zmDocument);
        zmDocument.setDocument(wmDocumentsService.create(zmDocument.getDocument()));
        zmDocumentRepository.save(zmDocument);
    }

    private void setDeliver(ZMDocument zmDocument){
        deliverRepository.findDeliverByUuid(zmDocument.getUuid()).ifPresentOrElse(zmDocument::setDeliver
                ,()->{throw new RuntimeException();});
    }
}
