package com.example.suma.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "basket_item",schema = "suma")
@Entity
public class BasketItem {
    @Id
    @GeneratedValue(generator = "basket_item_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "basket_item_id_seq",sequenceName = "basket_item_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String uuid;
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "product")
    private Product product;
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "basket")
    private Basket basket;
    private long quantity;
    private double price;
}
