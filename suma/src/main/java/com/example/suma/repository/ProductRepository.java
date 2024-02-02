package com.example.suma.repository;

import com.example.suma.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
    long countAllByActiveIsTrue();
}
