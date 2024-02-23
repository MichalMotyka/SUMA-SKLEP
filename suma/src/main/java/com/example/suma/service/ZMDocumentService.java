package com.example.suma.service;

import com.example.suma.entity.*;
import com.example.suma.exceptions.DeliverDontExistException;
import com.example.suma.exceptions.OrderDontExistException;
import com.example.suma.repository.DeliverRepository;
import com.example.suma.repository.ReservationRepository;
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
        WMDocuments wmDocuments = new WMDocuments();
        wmDocuments.setWmProductsList(zmDocument.getDocument().getWmProductsList());
        setDeliver(zmDocument);
        zmDocument.setCreateDate(LocalDate.now());
        zmDocument.setUuid(UUID.randomUUID().toString());
        zmDocument = zmDocumentRepository.saveAndFlush(zmDocument);
        zmDocument.setDocument(wmDocumentsService.create(wmDocuments));
        zmDocumentRepository.save(zmDocument);
    }

    public String saveOrder(ZMDocument zmDocument,Basket basket){
        WMDocuments wmDocuments = new WMDocuments();
        wmDocuments.setWmProductsList(zmDocument.getDocument().getWmProductsList());
        ZMDocument existing = wmDocumentsService.getWMByBasket(basket);
        if(basket != null && existing == null){
            zmDocument.setCreateDate(LocalDate.now());
            zmDocument.setState(State.PROJECT);
            zmDocument.setUuid(UUID.randomUUID().toString());
            zmDocument.setDocument(null);
            zmDocument = zmDocumentRepository.saveAndFlush(zmDocument);
        }else{
            zmDocument = existing;
            wmDocumentsService.removeReservation(zmDocument);
            WMDocuments wmToRemove = zmDocument.getDocument();
            zmDocument.setDocument(null);
            zmDocumentRepository.save(zmDocument);
            wmDocumentsService.deleteWm(wmToRemove);

        }
        zmDocument.setDocument(wmDocumentsService.create(wmDocuments));
        wmDocumentsService.makeReservation(basket,zmDocument);
        zmDocumentRepository.save(zmDocument);
        return zmDocument.getUuid();
    }

    public void setDataOrder(ZMDocument zmDocument){
        zmDocumentRepository.findZMDocumentByUuid(zmDocument.getUuid()).ifPresentOrElse(value->{
            value.setName(zmDocument.getName());
            value.setSurname(zmDocument.getSurname());
            value.setCompanyName(zmDocument.getCompanyName());
            value.setNip(zmDocument.getNip());
            value.setHomeNumber(zmDocument.getHomeNumber());
            value.setStreet(zmDocument.getStreet());
            value.setCity(zmDocument.getCity());
            value.setPostCode(zmDocument.getPostCode());
            value.setInvoicing(zmDocument.isInvoicing());
            value.setInvoicingName(zmDocument.getInvoicingName());
            value.setInvoicingSurname(zmDocument.getInvoicingSurname());
            value.setInvoicingCompanyName(zmDocument.getInvoicingCompanyName());
            value.setInvoicingNip(zmDocument.getInvoicingNip());
            value.setInvoicingHomeNumber(zmDocument.getInvoicingHomeNumber());
            value.setInvoicingStreet(zmDocument.getInvoicingStreet());
            value.setInvoicingCity(zmDocument.getInvoicingCity());
            value.setInvoicingPostCode(zmDocument.getInvoicingPostCode());
            value.setEmail(zmDocument.getEmail());
            value.setPhoneNumber(zmDocument.getPhoneNumber());
            value.setInfo(zmDocument.getInfo());
            value.setDeliver(new Deliver(zmDocument.getDeliver().getUuid()));
            setDeliver(value);
            zmDocumentRepository.save(value);
        },()-> {throw new OrderDontExistException();});

    }

    private void setDeliver(ZMDocument zmDocument){
        deliverRepository.findDeliverByUuid(zmDocument.getDeliver().getUuid()).ifPresentOrElse(zmDocument::setDeliver
                ,()->{throw new DeliverDontExistException();});
    }
}
