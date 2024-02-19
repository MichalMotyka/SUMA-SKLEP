package com.example.suma.repository;

import com.example.suma.entity.WMProducts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WMProductsRepository extends JpaRepository<WMProducts,Long> {
}
