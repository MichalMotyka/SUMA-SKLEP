package com.example.suma.repository;

import com.example.suma.entity.PMProducts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PMProductRepository extends JpaRepository<PMProducts,Long> {
}
