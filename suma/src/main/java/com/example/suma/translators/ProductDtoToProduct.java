package com.example.suma.translators;


import com.example.suma.entity.Category;
import com.example.suma.entity.Product;
import com.example.suma.entity.dto.CategoryDTO;
import com.example.suma.entity.dto.ProductDTO;
import com.example.suma.entity.dto.Properties;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public abstract class ProductDtoToProduct {

    @Mappings({
            @Mapping(target = "category", expression = "java(toCategory(productDTO.getCategory()))"),
            @Mapping(target = "properties", expression = "java(translateProperties(productDTO.getProperties()))")
    })
    public abstract Product toProduct(ProductDTO productDTO);

    @Mappings({
            @Mapping(target = "category", expression = "java(toCategoryDTO(product.getCategory()))"),
            @Mapping(target = "properties", expression = "java(translatePropertiesDto(product.getProperties()))")
    })
    public abstract ProductDTO toProductDTO(Product product);

    @Mappings({
            @Mapping(target = "supercategory",expression = "java(translateSupercategory(categoryDTO.getSupercategory()))")
    })
    protected abstract Category toCategory(CategoryDTO categoryDTO);

    @Mappings({
            @Mapping(target = "supercategory",expression = "java(translateSupercategoryDTO(category.getSupercategory()))")
    })
    protected abstract CategoryDTO toCategoryDTO(Category category);


    protected Category translateSupercategory(String uuid){
        if (uuid != null && !uuid.isBlank()){
            Category category = new Category();
            category.setUuid(uuid);
            return category;
        }
        return null;
    }

    protected List<Map<String,String>> translateProperties(List<Properties> propertiesList){
        List<Map<String,String>> propertiesMap = new ArrayList<>();
        if (propertiesList != null && !propertiesList.isEmpty()){
            propertiesList.forEach(properties ->{
                propertiesMap.add(Map.of("name",properties.getName(),"value",properties.getValue()));
            });
        }
        return propertiesMap;
    }

    protected List<Properties> translatePropertiesDto(List<Map<String,String>> propertiesMapList){
        List<Properties> propertiesList = new ArrayList<>();
        if (propertiesMapList != null){
            propertiesMapList.forEach(value->{
                propertiesList.add(new Properties(value.get("name"),value.get("value")));
            });
        }
        return propertiesList;
    }

    protected String translateSupercategoryDTO(Category category){
        if (category != null && category.getUuid() != null){
            return  category.getUuid();
        }
        return null;
    }
}
