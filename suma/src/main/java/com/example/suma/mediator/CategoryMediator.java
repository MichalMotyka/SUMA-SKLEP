package com.example.suma.mediator;

import com.example.suma.entity.Category;
import com.example.suma.entity.dto.CategoryDTO;
import com.example.suma.exceptions.CategoryAlreadyExistException;
import com.example.suma.service.CategoryService;
import com.example.suma.translators.CategoryDtoToCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

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

    public void updateCategory(CategoryDTO categoryDTO) {
        categoryService.updateCategory(categoryDTO);
    }
}
