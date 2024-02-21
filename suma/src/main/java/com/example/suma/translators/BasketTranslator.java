package com.example.suma.translators;

import com.example.suma.entity.Basket;
import com.example.suma.entity.BasketItem;
import com.example.suma.entity.Product;
import com.example.suma.entity.dto.BasketDTO;
import com.example.suma.entity.dto.BasketItemDTO;
import com.example.suma.entity.dto.ProductDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.ArrayList;
import java.util.List;

@Mapper
public abstract class BasketTranslator {

    @Mappings({
        @Mapping(target = "basketItem",expression = "java(translateBasketItemTOBasketItemDTO(basket.getBasketItem()))"),
        @Mapping(target = "finalPrice",expression = "java(translateFinalPrice(basket.getBasketItem()))")
    })
    public abstract BasketDTO translateBasketToBasketDTO(Basket basket);

    @Mappings({

    })
    public abstract BasketItem translateBasketItemDTOToBasketItem(BasketItemDTO basketItem);

    @Mappings({
            @Mapping(target = "category", ignore = true ),
            @Mapping(target = "properties",ignore = true)
    })
    protected abstract ProductDTO translateProductToProductDTO(Product product);

    protected double translateFinalPrice(List<BasketItem> basketItems){
        double price = 0D;
        for (BasketItem item:basketItems){
            price+= item.getPrice();
        }
        return price;
    }


    @Mappings({
            @Mapping(target = "category", ignore = true ),
            @Mapping(target = "properties",ignore = true)
    })
    protected abstract Product translateProductDTOToProduct(ProductDTO productDTO);

    protected List<BasketItemDTO> translateBasketItemTOBasketItemDTO(List<BasketItem> basketItems){
        List<BasketItemDTO> basketItemDTO = new ArrayList<>();
        if (basketItems != null){
            basketItems.forEach(value->{
                basketItemDTO.add(new BasketItemDTO(value.getUuid(),translateProductToProductDTO(value.getProduct()),value.getQuantity(),value.getPrice()));
            });
        }
        return basketItemDTO;
    }
}
