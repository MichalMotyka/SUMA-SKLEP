package com.example.suma.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(schema = "suma")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(generator = "reservation_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "reservation_id_seq",sequenceName = "reservation_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "basket")
    private Basket basket;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "zm")
    private ZMDocument zm;
    private LocalDateTime createDate;
}
