package com.example.suma.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BasketItemDTO {
    private String uuid;
    private ProductDTO product;
    private long quantity;
    private double price;
}
