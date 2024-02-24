package com.example.sumasheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SchedulerReservation {

    private final ProductRepository productRepository;
    private final ReservationRepository reservationRepository;

    @Scheduled(fixedRate = 60000)
    public void removeReservation(){
        reservationRepository.getAllToRemove().forEach(reservation -> {
            reservation.getZm().getDocument().getWmProductsList().forEach(wmProducts -> {
                wmProducts.getProduct().setAvailable(wmProducts.getProduct().getAvailable()+ wmProducts.getQuantity());
                productRepository.save(wmProducts.getProduct());
            });
            reservationRepository.delete(reservation);
        });
    }
}
