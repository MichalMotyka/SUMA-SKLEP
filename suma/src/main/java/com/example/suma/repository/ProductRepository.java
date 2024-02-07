package com.example.suma.repository;

import com.example.suma.entity.Category;
import com.example.suma.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
    long countAllByActiveIsTrueAndCategory(Category category);
    Optional<Product> findProductByUuid(String uuid);
    List<Product> findProductByNameAndActiveTrue(String name);
}
