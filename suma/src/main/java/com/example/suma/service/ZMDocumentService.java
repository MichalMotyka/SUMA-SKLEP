package com.example.suma.service;

import com.example.suma.entity.*;
import com.example.suma.entity.notify.Notify;
import com.example.suma.entity.notify.Status;
import com.example.suma.exceptions.DeliverDontExistException;
import com.example.suma.exceptions.OrderDontExistException;
import com.example.suma.repository.DeliverRepository;
import com.example.suma.repository.ProductRepository;
import com.example.suma.repository.ZMDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class ZMDocumentService {
    private final ZMDocumentRepository zmDocumentRepository;
    private final ProductRepository productRepository;
    private final WMDocumentsService wmDocumentsService;
    private final DeliverRepository deliverRepository;
    private final PayuService payuService;
    private final EmailService emailService;


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
        zmDocument = zmDocumentRepository.saveAndFlush(zmDocument);
        return zmDocument.getUuid();
    }

    public URI setDataOrder(ZMDocument zmDocument) throws URISyntaxException {
        AtomicReference<PayuResponse> url = new AtomicReference<>();
        zmDocumentRepository.findZMDocumentByUuid(zmDocument.getUuid()).ifPresentOrElse(value->{
            value.setName(zmDocument.getName());
            value.setParcelLocker(zmDocument.getParcelLocker());
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
            value = zmDocumentRepository.saveAndFlush(value);

            PayuResponse response = payuService.createOrder(value);
            value.setExtUuid(response.getOrderId());
            value.setState(State.TOPAY);
            url.set(response);
            value.setMessage("Oczekiwanie na opłacenie zamówienia.");
            emailService.sendOrder(zmDocument);
            value.setPayuUrl(url.get().getRedirectUri());
            zmDocumentRepository.save(value);


        },()-> {throw new OrderDontExistException();});
        return new URI(url.get().getRedirectUri());
    }

    private void setDeliver(ZMDocument zmDocument){
        deliverRepository.findDeliverByUuid(zmDocument.getDeliver().getUuid()).ifPresentOrElse(zmDocument::setDeliver
                ,()->{throw new DeliverDontExistException();});
    }

    public void changeStatus(Notify notify) {
        zmDocumentRepository.findZMDocumentByUuid(notify.getOrder().getExtOrderId()).ifPresentOrElse(value->{
            if (value.getState() == State.PROJECT || value.getState() == State.TOPAY){
                if (notify.getOrder().getStatus() == Status.COMPLETED){
                    value.setState(State.CREATED);
                    value.getDocument().setState(State.COMPLETED);
                    value.setMessage("Zamówienie w trakcie realizacji.");
                    value.getDocument().getWmProductsList().forEach(wmProducts -> productRepository.findById(wmProducts.getProduct().getId()).ifPresent(product -> {
                        product.setCount(product.getCount() - wmProducts.getQuantity());
                        product.setAvailable(product.getAvailable() - wmProducts.getQuantity());
                        productRepository.save(product);
                    }));
                }else if(notify.getOrder().getStatus() == Status.CANCELED){
                    value.setState(State.REJECTED);
                    value.getDocument().setState(State.REJECTED);
                    value.setMessage("Zamówienie zostało anulowane przez klienta.");
                }
                if (notify.getOrder().getStatus() == Status.COMPLETED ||
                        notify.getOrder().getStatus() == Status.CANCELED){
                    value.setPayuUrl(null);
                    wmDocumentsService.removeReservation(value);
                }
            }
            zmDocumentRepository.save(value);
        },()->{throw new RuntimeException();});
    }

    public void setDeliverOrder(Deliver deliver,String uuid) {
        zmDocumentRepository.findZMDocumentByUuid(uuid).ifPresentOrElse(zmDocument -> deliverRepository.findDeliverByUuid(deliver.getUuid()).ifPresentOrElse(zmDocument::setDeliver,
                ()->{throw new DeliverDontExistException();}),()->{throw new OrderDontExistException();});
    }

    public ZMDocument getZzmByUuid(String order) {
        return zmDocumentRepository.findZMDocumentByUuid(order).orElseThrow(OrderDontExistException::new);
    }
}
