package com.example.suma.service;

import com.example.suma.entity.*;
import com.example.suma.entity.dto.BasketDTO;
import com.example.suma.exceptions.InsufficientQuantityProductException;
import com.example.suma.exceptions.MinimumQuantityException;
import com.example.suma.repository.BasketItemRepository;
import com.example.suma.repository.BasketRepository;
import com.example.suma.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BasketService {

    private final BasketRepository basketRepository;
    private final ProductService productService;
    private final BasketItemRepository basketItemRepository;
    private final ReservationRepository reservationRepository;
    private final WMDocumentsService wmDocumentsService;

    private Basket createBasket() {
        Basket basket = new Basket();
        basket.setUuid(UUID.randomUUID().toString());
        basket.setLastEdit(LocalDate.now());
        return basketRepository.saveAndFlush(basket);
    }

    public Basket getBasket(String uuid) {
        if (uuid == null) {
            return createBasket();
        }
        final Basket[] basket = {null};
        basketRepository.findBasketByUuid(uuid).ifPresentOrElse(value -> {
            basket[0] = value;
        }, () -> {
            basket[0] = createBasket();
        });
        return basket[0];
    }

    public void editBasketItem(BasketItem basketItem, String basketUuid) {
        boolean itemExist = false;
        Basket basket = getBasket(basketUuid);
        ZMDocument zmDocument = wmDocumentsService.getWMByBasket(basket);
        if (basket != null && basket.getBasketItem() != null) {
            for (BasketItem item : basket.getBasketItem()) {
                if (item.getUuid().equals(basketItem.getUuid()) ||
                        item.getProduct().getUuid().equals(basketItem.getProduct().getUuid())) {
                    if (basketItem.getQuantity() == 0L) {
                        basket.getBasketItem().remove(item);
                        basketItemRepository.deleteById(item.getId());
                    } else if (basketItem.getQuantity() < 0) {
                        throw new MinimumQuantityException();
                    } else {
                        boolean isInZzm = false;
                        if (zmDocument != null && zmDocument.getDocument() != null) {
                            for (WMProducts wmProducts : zmDocument.getDocument().getWmProductsList()) {
                                if (wmProducts.getProduct().getUuid().equals(basketItem.getProduct().getUuid())) {
                                    isInZzm = true;
                                    if (basketItem.getQuantity() > productService.getProductByUuid(basketItem.getProduct().getUuid()).getAvailable() + wmProducts.getQuantity()) {
                                        throw new InsufficientQuantityProductException();
                                    }
                                }
                            }
                        }
                        if (!isInZzm) {
                            if (basketItem.getQuantity() > productService.getProductByUuid(basketItem.getProduct().getUuid()).getAvailable()) {
                                throw new InsufficientQuantityProductException();
                            }
                        }
                        item.setQuantity(basketItem.getQuantity());
                        item.setPrice(item.getProduct().getPrice() * item.getQuantity());
                        basketItemRepository.save(item);
                    }
                    itemExist = true;
                    break;
                }
            }
        }
        if (!itemExist && basketItem.getQuantity() != 0) {
            if (basketItem.getQuantity() > productService.getProductByUuid(basketItem.getProduct().getUuid()).getAvailable()) {
                throw new InsufficientQuantityProductException();
            }
            basket.getBasketItem().add(addBasketItem(basketItem, basket));
        }
        basket.setLastEdit(LocalDate.now());
        basketRepository.save(basket);
    }

    public BasketItem addBasketItem(BasketItem basketItem, Basket basket) {
        basketItem.setBasket(basket);
        basketItem.setProduct(productService.getProductByUuid(basketItem.getProduct().getUuid()));
        basketItem.setPrice(basketItem.getQuantity() * basketItem.getProduct().getPrice());
        basketItem.setUuid(UUID.randomUUID().toString());
        basketItemRepository.save(basketItem);
        return basketItem;
    }


    public BasketDTO setAvailable(BasketDTO basketDTO, Basket basket) {
        basketDTO.getBasketItem().forEach(basketItemDTO -> {
            reservationRepository.findReservationByBasket(basket).ifPresent(reservation -> {
                reservation.getZm().getDocument().getWmProductsList().forEach(wmProducts -> {
                    if (basketItemDTO.getProduct().getUuid().equals(wmProducts.getProduct().getUuid())) {
                        basketItemDTO.getProduct().setAvailable(basketItemDTO.getProduct().getAvailable() + wmProducts.getQuantity());
                    }
                });
            });
        });
        return basketDTO;
    }
}
