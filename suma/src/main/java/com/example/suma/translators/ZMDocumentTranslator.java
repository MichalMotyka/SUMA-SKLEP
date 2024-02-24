package com.example.suma.translators;

import com.example.suma.entity.*;
import com.example.suma.entity.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public abstract class ZMDocumentTranslator {

    @Mappings({
        @Mapping(target = "document", expression = "java(translateWMDocuments(orderDTO.getDetails()))")
    })
    public abstract ZMDocument translateOrder(OrderDTO orderDTO);

    @Mappings({
            @Mapping(target = "document",expression ="java(translateWMDocumentsFromBasket(basket.getBasketItem()))" ),
    })
    public abstract ZMDocument translateOrder(Basket basket);

    protected WMDocuments translateWMDocuments(List<OrderDetailsDTO> orderDetailsDTO){
        return  new WMDocuments(null,null,null,0,translateOrderDetailsProducts(orderDetailsDTO));
    }

    protected WMDocuments translateWMDocumentsFromBasket(List<BasketItem> basketItem){
        return  new WMDocuments(null,null,null,0,translatorBasketProducts(basketItem));
    }

    protected List<WMProducts> translatorBasketProducts(List<BasketItem> basketItem){
       return basketItem.stream().map(x-> new WMProducts(0,null,
               new Product(x.getProduct().getUuid()),null, x.getQuantity())).collect(Collectors.toList());
    }

    protected List<WMProducts> translateOrderDetailsProducts(List<OrderDetailsDTO> orderDetailsDTO) {
        if (orderDetailsDTO != null) {
            return orderDetailsDTO.stream().map(x ->
                            new WMProducts(0,
                                    x.getUuid(),
                                    new Product(x.getProduct().getUuid()),
                                    null,
                                    x.getQuantity()))
                    .collect(Collectors.toList());
        }
        return null;
    }
}
