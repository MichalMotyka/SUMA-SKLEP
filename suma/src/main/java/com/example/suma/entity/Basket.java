package com.example.suma.entity;

import jakarta.persistence.*;
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
@Table(name = "basket",schema = "suma")
@Entity
public class Basket {
    @Id
    @GeneratedValue(generator = "basket_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "basket_id_seq",sequenceName = "basket_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String uuid;
    @OneToMany(mappedBy = "basket",fetch = FetchType.EAGER)
    private List<BasketItem> basketItem;
    private LocalDate lastEdit;
}
