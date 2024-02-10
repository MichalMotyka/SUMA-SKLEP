package com.example.suma.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private String uuid;
    private String name;
    private String description;
    private CategoryDTO category;
    private long available;
    private long count;
    private double price;
    private String mainImg;
    private List<String> images;
    private boolean active;
    private List<Properties> properties;
}
