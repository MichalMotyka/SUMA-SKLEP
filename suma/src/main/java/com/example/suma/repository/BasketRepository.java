package com.example.suma.repository;

import com.example.suma.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BasketRepository extends JpaRepository<Basket,Long> {
    Optional<Basket> findBasketByUuid(String uuid);
}
