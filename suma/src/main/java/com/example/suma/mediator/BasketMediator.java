package com.example.suma.mediator;

import com.example.suma.entity.Basket;
import com.example.suma.entity.BasketItem;
import com.example.suma.entity.dto.BasketDTO;
import com.example.suma.entity.dto.BasketItemDTO;
import com.example.suma.service.BasketService;
import com.example.suma.translators.BasketTranslator;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class BasketMediator {

    @Value("${backend.adres}")
    private String adress;

    private final BasketService basketService;
    private final BasketTranslator basketTranslator;
    public BasketDTO getBasket(HttpServletResponse response, HttpServletRequest request) {
        Basket basket = basketService.getBasket(getBasketUuid(request,response));
        int size = 0;
        if(basket.getBasketItem() != null){
            for (BasketItem basketItem:basket.getBasketItem()){
                size += (int) basketItem.getQuantity();
            }
            basket.getBasketItem().forEach(basketItem -> {
                basketItem.getProduct().setMainImg(adress + "/api/v1/product/image" + basketItem.getProduct().getMainImg());
            });
        }
        response.setHeader("X-Total-Basket-Product-Count", String.valueOf(size));
        response.addCookie(new Cookie("basket-uuid",basket.getUuid()));
        BasketDTO basketDTO = basketTranslator.translateBasketToBasketDTO(basket);
        basketDTO = basketService.setAvailable(basketDTO,basket);
        Collections.sort(basketDTO.getBasketItem(), Comparator.comparing(BasketItemDTO::getUuid).reversed());
        return basketDTO;
    }

    public void editBasket(BasketItemDTO basketItemDTO, HttpServletResponse response, HttpServletRequest request) {
        BasketItem basketItem = basketTranslator.translateBasketItemDTOToBasketItem(basketItemDTO);
        String basket = getBasketUuid(request,response);
        if (basket == null) basket = getBasket(response, request).getUuid();
        basketService.editBasketItem(basketItem,basket);
    }

    private String getBasketUuid(HttpServletRequest request,HttpServletResponse response){
        final String[] uuid = {null};
        if (request.getCookies() != null){
            Arrays.stream(request.getCookies()).toList().forEach(value->{
                if (value.getName().equals("basket-uuid")){
                    uuid[0] = value.getValue();
                }
            });
        }else{
            uuid[0] = basketService.getBasket(null).getUuid();
            response.addCookie(new Cookie("basket-uuid",uuid[0]));
        }
        return uuid[0];
    }
}
