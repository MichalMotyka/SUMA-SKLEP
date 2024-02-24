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
            @Mapping(target = "unitPrice", source = "wmProducts.product.price"),
            @Mapping(target = "quantity", source = "wmProducts.quantity")
    })
    public abstract PayuProduct toPayuProduct(WMProducts wmProducts);
}
