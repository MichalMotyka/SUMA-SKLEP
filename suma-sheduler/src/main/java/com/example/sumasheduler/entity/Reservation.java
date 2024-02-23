package com.example.sumasheduler.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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
    private long basket;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "zm")
    private ZMDocument zm;
    private LocalDate createDate;
}
