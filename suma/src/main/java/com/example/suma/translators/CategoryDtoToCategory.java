package com.example.suma.translators;


import com.example.suma.entity.Category;
import com.example.suma.entity.dto.CategoryDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

@Mapper
public abstract class CategoryDtoToCategory {

    @Mappings({
            @Mapping(target = "supercategory",expression = "java(translateSupercategory(categoryDTO.getSupercategory()))")
    })
    public abstract Category translateCategoryDTO(CategoryDTO categoryDTO);

    @Mappings({
            @Mapping(target = "supercategory", expression = "java(translateSupercategoryDTO(category.getSupercategory()))")
    })
    public abstract CategoryDTO translateCategory(Category category);


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
