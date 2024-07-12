package com.example.suma.repository;

import com.example.suma.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    Optional<Category> findCategoryByUuidAndIsSubcategoryIsFalse(String uuid);

    Optional<Category> findCategoryByUuid(String uuid);

    Optional<Category> findCategoryByName(String name);

    List<Category> findCategoryByNameAndIsSubcategory(String name,boolean subcategory);

    @Query(nativeQuery = true,value = "SELECT * from suma.category where is_subcategory = :subcategory")
    List<Category> findCategoryByIsSubcategory(@Param("subcategory") boolean subcategory);
    List<Category> findCategoriesByName(String name);

    @Query(nativeQuery = true,value = "SELECT c.* from suma.category c JOIN suma.category super ON c.supercategory = super.id WHERE super.name = :supercategoryName")
    List<Category> findCategoryBySupercategory(@Param("supercategoryName") String name);

    @Query(nativeQuery = true,value = "SELECT * from suma.category WHERE supercategory = :supercategoryId")
    List<Category> findCategoryBySupercategoryId(@Param("supercategoryId") long id);

    @Query(nativeQuery = true,value = "SELECT * FROM suma.category WHERE category.is_subcategory is TRUE OR id NOT IN (SELECT supercategory FROM suma.category WHERE supercategory IS NOT NULL)")
    List<Category> findCategoryAssignable();
}
