package com.example.suma.service;

import com.example.suma.entity.*;
import com.example.suma.exceptions.NoEnoughProductException;
import com.example.suma.repository.ProductRepository;
import com.example.suma.repository.ReservationRepository;
import com.example.suma.repository.WMDocumentsRepository;
import com.example.suma.repository.WMProductsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class WMDocumentsService{
    private final WMDocumentsRepository wmDocumentsRepository;
    private final WMProductsRepository wmProductsRepository;
    private final ProductService productService;
    private final ProductRepository productRepository;
    private final ReservationRepository reservationRepository;

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
        if (product.getAvailable() < wmProducts.getQuantity()){
            throw new NoEnoughProductException();
        }
        wmProducts.setUuid(UUID.randomUUID().toString());
        wmProducts.setProduct(product);
        wmProducts.setWmDocuments(wmDocuments);
        wmProductsRepository.save(wmProducts);
    }

    public void makeReservation(Basket basket, ZMDocument zmDocument){
        if(!reservationExist(basket)){
            zmDocument.getDocument().getWmProductsList().forEach(value->{
                value.getProduct().setAvailable(value.getProduct().getAvailable()-value.getQuantity());
                productRepository.save(value.getProduct());
            });
            Reservation reservation = new Reservation(0,basket,zmDocument, LocalDateTime.now());
            reservationRepository.save(reservation);
        }
    }

    public void removeReservation(ZMDocument zmDocument){
        reservationRepository.findReservationByZm(zmDocument).ifPresent(reservation -> {
            reservation.getZm().getDocument().getWmProductsList().forEach(wmProducts -> {
                wmProducts.getProduct().setAvailable(wmProducts.getProduct().getAvailable()+ wmProducts.getQuantity());
                productRepository.save(wmProducts.getProduct());
                wmProductsRepository.delete(wmProducts);
            });
            reservationRepository.delete(reservation);
        });
    }

    public void deleteWm(WMDocuments wmDocuments){
        wmDocumentsRepository.delete(wmDocuments);
    }

    public boolean reservationExist(Basket basket){
        return reservationRepository.findReservationByBasket(basket).isPresent();
    }

    public ZMDocument getWMByBasket(Basket basket){
        AtomicReference<ZMDocument> zmDocuments = new AtomicReference<>();
        reservationRepository.findReservationByBasket(basket).ifPresentOrElse(reservation -> zmDocuments.set(reservation.getZm()),()->zmDocuments.set(null));
        return zmDocuments.get();
    }
}
