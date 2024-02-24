package com.example.sumasheduler.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(schema = "suma")
@AllArgsConstructor
@NoArgsConstructor
public class Deliver {
    @Id
    @GeneratedValue(generator = "deliver_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "deliver_id_seq",sequenceName = "deliver_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String uuid;
    private String type;
    private String image;
    private double price;
}
