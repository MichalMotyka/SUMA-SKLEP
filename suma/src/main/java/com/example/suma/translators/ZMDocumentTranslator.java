package com.example.suma.translators;

import com.example.suma.entity.*;
import com.example.suma.entity.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Mapper
public abstract class ZMDocumentTranslator{

    @Mappings({
        @Mapping(target = "document", expression = "java(translateWMDocuments(orderDTO.getDetails()))")
    })
    public abstract ZMDocument translateOrder(OrderDTO orderDTO);

    @Mappings({
            @Mapping(target = "document",expression ="java(translateWMDocumentsFromBasket(basket.getBasketItem()))" ),
    })
    public abstract ZMDocument translateOrder(Basket basket);

    @Mappings({
            @Mapping(target = "details", expression = "java(translateOrderDetails(zmDocument.getDocument()))"),
            @Mapping(target = "deliver", expression = "java(translateDeliver(zmDocument.getDeliver(),zmDocument.getDocument()))"),
            @Mapping(target = "fullPrice", expression = "java(calcFullPrice(zmDocument.getDocument(),zmDocument.getDeliver()))")
    })
    public abstract OrderDTO translateZzmDocument(ZMDocument zmDocument);

    protected DeliverDTO translateDeliver(Deliver deliver,WMDocuments wmDocuments){
        AtomicLong productCount = new AtomicLong(0L);
        wmDocuments.getWmProductsList().forEach(value->{
            productCount.addAndGet(value.getQuantity());
        });
        return new DeliverDTO(deliver.getUuid(), deliver.getType(), deliver.getImage(),deliver.getPrice()*productCount.get());
    }

    protected List<OrderDetailsDTO> translateOrderDetails(WMDocuments wmDocument){
        List<OrderDetailsDTO> orderDetailsDTOS = new ArrayList<>();
        wmDocument.getWmProductsList().forEach(wmProducts -> {
            orderDetailsDTOS.add(new OrderDetailsDTO(wmProducts.getUuid(),
                    toProductDTO(wmProducts.getProduct()),
                    wmProducts.getQuantity(),
                    wmProducts.getProduct().getPrice(),
                    wmProducts.getQuantity()*wmProducts.getProduct().getPrice()));
        });
        return orderDetailsDTOS;
    }
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

    protected double calcFullPrice(WMDocuments wmDocuments,Deliver deliver){
        AtomicReference<Double> price = new AtomicReference<>(deliver.getPrice());
        wmDocuments.getWmProductsList().forEach(value->{
            price.updateAndGet(v -> (double) (v + value.getProduct().getPrice() * value.getQuantity()));
        });
        return Math.ceil(price.get()*100)/100;
    }

    @Mappings({
            @Mapping(target = "category", expression = "java(toCategoryDTO(product.getCategory()))"),
            @Mapping(target = "properties", expression = "java(translatePropertiesDto(product.getProperties()))")
    })
    public abstract ProductDTO toProductDTO(Product product);

    @Mappings({
            @Mapping(target = "supercategory",expression = "java(translateSupercategoryDTO(category.getSupercategory()))")
    })
    protected abstract CategoryDTO toCategoryDTO(Category category);
    protected String translateSupercategoryDTO(Category category){
        if (category != null && category.getUuid() != null){
            return  category.getUuid();
        }
        return null;
    }

    protected List<Properties> translatePropertiesDto(List<Map<String,String>> propertiesMapList){
        List<Properties> propertiesList = new ArrayList<>();
        if (propertiesMapList != null){
            propertiesMapList.forEach(value->{
                propertiesList.add(new Properties(value.get("name"),value.get("value"),value.get("uuid")));
            });
        }
        return propertiesList;
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
