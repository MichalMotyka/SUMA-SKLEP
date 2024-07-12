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
@Entity
@Table(name = "pm_products",schema = "suma")
public class PMProducts {
    @Id
    @GeneratedValue(generator = "pm_products_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "pm_products_id_seq",sequenceName = "pm_products_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String uuid;
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private Product product;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "pmdocuments_id")
    private PMDocument pmDocuments;
    private long quantity;
}
