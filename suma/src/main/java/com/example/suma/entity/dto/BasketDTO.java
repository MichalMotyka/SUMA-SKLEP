package com.example.suma.entity.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BasketDTO {
    private String uuid;
    private List<BasketItemDTO> basketItem;
}
