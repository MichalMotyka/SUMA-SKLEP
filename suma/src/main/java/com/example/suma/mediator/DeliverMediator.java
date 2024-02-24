package com.example.suma.mediator;

import com.example.suma.entity.dto.DeliverDTO;
import com.example.suma.service.DeliverService;
import com.example.suma.translators.DeliverTranslator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DeliverMediator {

    private final DeliverTranslator deliverTranslator;
    private final DeliverService deliverService;


    public List<DeliverDTO> getDeliver() {
        return deliverService.getDeliver().stream().map(deliverTranslator::toDeliver).collect(Collectors.toList());
    }
}
