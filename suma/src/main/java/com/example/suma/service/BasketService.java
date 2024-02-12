package com.example.suma.service;

import com.example.suma.entity.Basket;
import com.example.suma.entity.BasketItem;
import com.example.suma.entity.dto.BasketItemDTO;
import com.example.suma.repository.BasketItemRepository;
import com.example.suma.repository.BasketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class BasketService {

    private final BasketRepository basketRepository;
    private final ProductService productService;
    private final BasketItemRepository basketItemRepository;

    private Basket createBasket(){
        Basket basket = new Basket();
        basket.setUuid(UUID.randomUUID().toString());
        basket.setLastEdit(LocalDate.now());
        return basketRepository.saveAndFlush(basket);
    }

    public Basket getBasket(String uuid){
        if (uuid == null){
            return createBasket();
        }
        final Basket[] basket = {null};
        basketRepository.findBasketByUuid(uuid).ifPresentOrElse(value->{
            basket[0] = value;
        },()->{ basket[0] = createBasket();});
        return basket[0];
    }

    public void editBasketItem(BasketItem basketItem, String basketUuid) {
        boolean itemExist = false;
        Basket basket = getBasket(basketUuid);
        for (BasketItem item: basket.getBasketItem()){
            if(item.getUuid().equals(basketItem.getUuid()) ||
                    item.getProduct().getUuid().equals(basketItem.getProduct().getUuid())){
                if(basketItem.getQuantity() == 0L){
                    basket.getBasketItem().remove(item);
                    basketItemRepository.deleteById(item.getId());
                }else{
                    item.setQuantity(basketItem.getQuantity());
                    item.setPrice(item.getProduct().getPrice() * item.getQuantity());
                    basketItemRepository.save(item);
                }
                itemExist = true;
                break;
            }
        }
        if(!itemExist && basketItem.getQuantity() != 0){
            basket.getBasketItem().add(addBasketItem(basketItem,basket));
        }
        basket.setLastEdit(LocalDate.now());
        basketRepository.save(basket);
    }

    public BasketItem addBasketItem(BasketItem basketItem,Basket basket){
        basketItem.setBasket(basket);
        basketItem.setProduct(productService.getProductByUuid(basketItem.getProduct().getUuid()));
        basketItem.setPrice(basketItem.getQuantity() * basketItem.getProduct().getPrice());
        basketItem.setUuid(UUID.randomUUID().toString());
        basketItemRepository.save(basketItem);
        return basketItem;
    }
}
