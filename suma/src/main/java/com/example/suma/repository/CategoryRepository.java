package com.example.suma.repository;

import com.example.suma.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    Optional<Category> findCategoryByUuidAndIsSubcategoryIsFalse(String uuid);

    Optional<Category> findCategoryByUuid(String uuid);

    Optional<Category> findCategoryByName(String name);

}
