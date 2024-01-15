package com.example.suma.service;

import com.example.suma.entity.Category;
import com.example.suma.entity.dto.CategoryDTO;
import com.example.suma.exceptions.CategoryAlreadyExistException;
import com.example.suma.exceptions.CategoryDontExistException;
import com.example.suma.exceptions.SupercategoryDontExistException;
import com.example.suma.exceptions.SupercategoryNotEmptyException;
import com.example.suma.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public void create(Category category) {
        category.setUuid(UUID.randomUUID().toString());
        if (category.getSupercategory() != null){
            category.setSubcategory(true);
            categoryRepository.
                    findCategoryByUuidAndIsSubcategoryIsFalse(category.getSupercategory().getUuid()).
                    ifPresentOrElse(category::setSupercategory,()->{throw new SupercategoryDontExistException();});
        }
        categoryRepository.save(category);
    }

    public Category getCategoryByUuid(String uuid) {
       return categoryRepository.findCategoryByUuid(uuid).orElseThrow(CategoryDontExistException::new);
    }

    public void validateCategory(String name){
        categoryRepository.findCategoryByName(name).ifPresent(var ->{throw new CategoryAlreadyExistException();});
    }

    public void updateCategory(CategoryDTO categoryDTO) {
        categoryRepository.findCategoryByUuid(categoryDTO.getUuid()).ifPresentOrElse(value->{
            if(categoryDTO.getName()!= null && !categoryDTO.getName().equals(value.getName())){
                categoryRepository.findCategoryByName(categoryDTO.getName()).ifPresentOrElse(var ->{
                    throw new CategoryAlreadyExistException();
                },() -> {value.setName(categoryDTO.getName());});
            }

            else if ((value.getSupercategory() == null && categoryDTO.getSupercategory() != null) ||
                    (value.getSupercategory() != null && !categoryDTO.getSupercategory().equals(value.getSupercategory().getUuid()))){
                if (!value.getSubcategoriesy().isEmpty()){
                    throw new SupercategoryNotEmptyException();
                }
                categoryRepository.findCategoryByUuid(categoryDTO.getSupercategory()).ifPresentOrElse(category -> {
                        value.setSupercategory(category);
                        value.setSubcategory(true);
                    },
                        ()-> {throw new CategoryDontExistException();});
            }
            categoryRepository.save(value);
        },()->{
            throw new CategoryDontExistException();
        });
    }

    public List<Category> getCategory() {
        return categoryRepository.findAll();
    }
}
