package com.example.suma.service;

import com.example.suma.entity.Deliver;
import com.example.suma.repository.DeliverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliverService {

    private final DeliverRepository deliverRepository;

    public List<Deliver> getDeliver(){
        return deliverRepository.findAll();
    }
}
