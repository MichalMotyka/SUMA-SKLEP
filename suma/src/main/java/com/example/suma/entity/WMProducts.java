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
@Table(schema = "suma")
public class WMProducts {
    @Id
    @GeneratedValue(generator = "wm_products_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "wm_products_id_seq",sequenceName = "wm_products_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String uuid;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Product product;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private WMDocuments wmDocuments;
    private long quantity;
}
