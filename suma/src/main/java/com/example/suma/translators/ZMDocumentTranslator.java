package com.example.suma.translators;

import com.example.suma.entity.Product;
import com.example.suma.entity.WMDocuments;
import com.example.suma.entity.WMProducts;
import com.example.suma.entity.ZMDocument;
import com.example.suma.entity.dto.Order;
import com.example.suma.entity.dto.OrderDTO;
import com.example.suma.entity.dto.OrderDetailsDTO;
import com.example.suma.entity.dto.ProductDTO;
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

    protected WMDocuments translateWMDocuments(List<OrderDetailsDTO> orderDetailsDTO){
        return  new WMDocuments(null,null,null,0,translateOrderDetailsProducts(orderDetailsDTO));
    }
    protected List<WMProducts> translateOrderDetailsProducts(List<OrderDetailsDTO> orderDetailsDTO){
       return orderDetailsDTO.stream().map(x ->
               new WMProducts(0,
                       x.getUuid(),
                       new Product(x.getProduct().getUuid()),
                       null,
                       x.getQuantity()))
               .collect(Collectors.toList());
    }
}
