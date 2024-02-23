package com.example.sumasheduler;

import com.example.sumasheduler.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {

    @Query(nativeQuery = true,value = "select * from suma.reservation where create_date + INTERVAL '30 minutes' < now()")
    List<Reservation> getAllToRemove();
}
