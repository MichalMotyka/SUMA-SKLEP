package com.example.suma.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product",schema = "suma")
@Entity
public class Product {
    @Id
    @GeneratedValue(generator = "product_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "product_id_seq",sequenceName = "product_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String uuid;
    private String name;
    private String description;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category")
    private Category category;
    private long available;
    private long count;
    private double price;
    @Column(name = "main_img")
    private String mainImg;
    private List<String> images;
    private boolean active;
    @Column(name = "create_date")
    private LocalDate createDate;
    @JdbcTypeCode(SqlTypes.JSON)
    private List<Map<String,String>> properties;

    public Product(String uuid){
        this.uuid = uuid;
    }
}
