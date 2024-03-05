package com.example.suma.entity.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetailsDTO {
    private String uuid;
    private ProductDTO product;
    private long quantity;
    private double pricePerUnit;
    private double price;
}
