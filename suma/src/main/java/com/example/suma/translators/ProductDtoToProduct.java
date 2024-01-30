package com.example.suma.translators;


import com.example.suma.entity.Category;
import com.example.suma.entity.Product;
import com.example.suma.entity.dto.CategoryDTO;
import com.example.suma.entity.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper
public abstract class ProductDtoToProduct {

    @Mappings({
            @Mapping(target = "category", expression = "java(toCategory(productDTO.getCategory()))")
    })
    public abstract Product toProduct(ProductDTO productDTO);

    @Mappings({
            @Mapping(target = "category", expression = "java(toCategoryDTO(product.getCategory()))")
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

    protected String translateSupercategoryDTO(Category category){
        if (category != null && category.getUuid() != null){
            return  category.getUuid();
        }
        return null;
    }
}
