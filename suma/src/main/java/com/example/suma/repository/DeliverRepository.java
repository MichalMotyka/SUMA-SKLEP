package com.example.suma.repository;

import com.example.suma.entity.Deliver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeliverRepository extends JpaRepository<Deliver,Long> {
    Optional<Deliver> findDeliverByUuid(String uuid);
}
