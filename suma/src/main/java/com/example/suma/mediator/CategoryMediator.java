package com.example.suma.mediator;

import com.example.suma.entity.Category;
import com.example.suma.entity.dto.CategoryDTO;
import com.example.suma.entity.dto.FilterType;
import com.example.suma.exceptions.UuidNullException;
import com.example.suma.service.CategoryService;
import com.example.suma.translators.CategoryDtoToCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CategoryMediator {

    private final CategoryService categoryService;
    private final CategoryDtoToCategory translatorCategory;

    public void createCategory(CategoryDTO categoryDTO){
        categoryService.validateCategory(categoryDTO.getName());
        Category category = translatorCategory.translateCategoryDTO(categoryDTO);
        categoryService.create(category);
    }

    public CategoryDTO getCategory(String uuid) {
       Category category = categoryService.getCategoryByUuid(uuid);
       return translatorCategory.translateCategory(category);
    }

    public List<CategoryDTO> getCategory(FilterType type, String name, boolean bySupercategory){
        List<Category> category = categoryService.getCategory(type,name,bySupercategory);
        return category.stream().map(translatorCategory::translateCategory).collect(Collectors.toList());
    }

    public void updateCategory(CategoryDTO categoryDTO) {
        if (categoryDTO.getUuid() == null){
            throw new UuidNullException("Nie przekazano identyfikatora kategorii");
        }
        categoryService.updateCategory(categoryDTO);
    }
}
