package com.example.sumasheduler.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category",schema = "suma")
@Entity
@EqualsAndHashCode
public class Category {
    @Id
    @GeneratedValue(generator = "category_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "category_id_seq",sequenceName = "category_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String uuid;
    private String name;
    @Column(name = "is_subcategory")
    private boolean isSubcategory;
    @OneToMany(mappedBy="supercategory",fetch = FetchType.EAGER)
    private List<Category> subcategoriesy;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "supercategory")
    private Category supercategory;
}
