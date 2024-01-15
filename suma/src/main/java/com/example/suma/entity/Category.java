package com.example.suma.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category",schema = "suma")
@Entity
public class Category {
    @Id
    @GeneratedValue(generator = "category_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "category_id_seq",sequenceName = "category_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String uuid;
    private String name;
    @Column(name = "is_subcategory")
    private boolean isSubcategory;
    @OneToMany(mappedBy="supercategory",fetch = FetchType.LAZY)
    private Set<Category> subcategoriesy;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "supercategory")
    private Category supercategory;
}
