package com.example.suma.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Product {
    @Id
    private long id;
    private String uuid;
    private String name;
    private String description;
    @ManyToOne(cascade = CascadeType.ALL)
    private Category category;
    private long available;
    private long count;
    private double price;
    private String mainImg;
    private List<String> images;
    private boolean active;
    @Column(name = "create_date")
    private LocalDate createDate;
}
