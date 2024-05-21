package com.example.suma.repository;

import com.example.suma.entity.Category;
import com.example.suma.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
    long countAllByActiveIsTrueAndCategory(Category category);
    Optional<Product> findProductByUuid(String uuid);
    List<Product> findProductByNameAndActiveTrue(String name);
    @Query(nativeQuery = true,value = "UPDATE suma.product SET images = json_array(images, '$', :image) WHERE uuid = :productUuid")
    void  addImageByProductUuid(@Param("productUuid") String productUuid,@Param("image") String image);
}
