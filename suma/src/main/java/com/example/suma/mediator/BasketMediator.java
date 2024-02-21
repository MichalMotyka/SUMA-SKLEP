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
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class BasketMediator {
    private final BasketService basketService;
    private final BasketTranslator basketTranslator;
    public BasketDTO getBasket(HttpServletResponse response, HttpServletRequest request) {
        Basket basket = basketService.getBasket(getBasketUuid(request));
        String size = "0";
        if(basket.getBasketItem() != null){
            size = String.valueOf(basket.getBasketItem().size());
        }
        response.setHeader("X-Total-Basket-Product-Count",size);
        response.addCookie(new Cookie("basket-uuid",basket.getUuid()));
        BasketDTO basketDTO = basketTranslator.translateBasketToBasketDTO(basket);
        Collections.sort(basketDTO.getBasketItem(), Comparator.comparing(BasketItemDTO::getUuid).reversed());
        return basketDTO;
    }

    public void editBasket(BasketItemDTO basketItemDTO, HttpServletResponse response, HttpServletRequest request) {
        BasketItem basketItem = basketTranslator.translateBasketItemDTOToBasketItem(basketItemDTO);
        basketService.editBasketItem(basketItem,getBasketUuid(request));
    }


    private String getBasketUuid(HttpServletRequest request){
        final String[] uuid = {null};
        if (request.getCookies() != null){
            Arrays.stream(request.getCookies()).toList().forEach(value->{
                if (value.getName().equals("basket-uuid")){
                    uuid[0] = value.getValue();
                }
            });
        }
        return uuid[0];
    }
}
