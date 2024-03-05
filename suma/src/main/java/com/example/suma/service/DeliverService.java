package com.example.suma.service;

import com.example.suma.entity.Deliver;
import com.example.suma.repository.DeliverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeliverService {

    private final DeliverRepository deliverRepository;

    public List<Deliver> getDeliver(){
        return deliverRepository.findAll();
    }

    public Optional<Deliver> getDeliverByUuid(String uuid) {
       return deliverRepository.findDeliverByUuid(uuid);
    }
}
