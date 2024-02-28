package com.example.suma.translators;

import com.example.suma.entity.PayuProduct;
import com.example.suma.entity.WMProducts;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper
public abstract class WMDocumentsToPayuProduct {

    @Mappings({
            @Mapping(target = "name", source = "wmProducts.product.name"),
            @Mapping(target = "unitPrice", expression = "java(toUnitPrice(wmProducts.getProduct().getPrice()))"),
            @Mapping(target = "quantity", expression = "java(wmProducts.getQuantity())")
    })
    public abstract PayuProduct toPayuProduct(WMProducts wmProducts);


    protected long toUnitPrice(double price){
        return (long)(price * 100);
    }
}
