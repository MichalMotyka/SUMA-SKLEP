package com.example.suma.repository;

import com.example.suma.entity.WMDocuments;
import com.example.suma.entity.WMProducts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WMProductsRepository extends JpaRepository<WMProducts,Long> {
    List<WMProducts> findAllByWmDocuments(WMDocuments wmDocuments);
}
