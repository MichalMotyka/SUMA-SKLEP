package com.example.suma.service;


import com.example.suma.entity.Product;
import com.example.suma.entity.dto.Sort;
import com.example.suma.repository.CategoryRepository;
import com.example.suma.repository.ProductRepository;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public void create(Product product) {
        product.setCount(0);
        product.setAvailable(0);
        product.setUuid(UUID.randomUUID().toString());
        productRepository.save(product);
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public List<Product> getProducts(String search, int page, int limit, Sort sort, com.example.suma.entity.dto.Order order, String category, Double price_min, Double price_max) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> query = criteriaBuilder.createQuery(Product.class);
        Root<Product> root = query.from(Product.class);
        if (order != null && sort != null) {
            String column = sort.getLabel();
            Order orderQuery;
            if (order.getLabel().equals("desc")){
                orderQuery =  criteriaBuilder.desc(root.get(column));
            }else {
                orderQuery =  criteriaBuilder.asc(root.get(column));
            }
            query.orderBy(orderQuery);
        }
        if (page <= 0) page = 1;
        List<Predicate> predicates = prepareQuery(category,search,price_min,price_max,criteriaBuilder,root);
        query.where(predicates.toArray(new Predicate[0]));
        return entityManager.createQuery(query).setFirstResult((page-1)*limit).setMaxResults(limit).getResultList();
    }
    private List<Predicate> prepareQuery(String category,String search,Double price_min,Double price_max,CriteriaBuilder criteriaBuilder,Root<Product> root){
        List<Predicate> predicates = new ArrayList<>();
        if (search != null && !search.isEmpty()){
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),"%"+search.toLowerCase()+"%"));
        }
        if (category != null && !category.isEmpty()){
            categoryRepository.findCategoryByUuid(category).ifPresent(value-> predicates.add(criteriaBuilder.equal(root.get("category"), value)));
        }
        if (price_min != null) {
            predicates.add(criteriaBuilder.greaterThan(root.get("price"), price_min-0.01));
        }
        if (price_max != null) {
            predicates.add(criteriaBuilder.lessThan(root.get("price"), price_max+0.01));
        }
        predicates.add(criteriaBuilder.isTrue(root.get("active")));
        return predicates;
    }
}