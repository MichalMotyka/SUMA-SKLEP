package com.example.suma.repository;

import com.example.suma.entity.Basket;
import com.example.suma.entity.Reservation;
import com.example.suma.entity.ZMDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {

    Optional<Reservation> findReservationByBasket(Basket basket);
    Optional<Reservation> findReservationByZm(ZMDocument zm);
}
