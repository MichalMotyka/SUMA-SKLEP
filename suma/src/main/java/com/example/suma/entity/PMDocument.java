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
@Entity
@Table(name = "pm_documents",schema = "suma")
@Inheritance(strategy= InheritanceType.SINGLE_TABLE)
public class PMDocument extends Document{
    @Id
    @GeneratedValue(generator = "pm_documents_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "pm_documents_id_seq",sequenceName = "pm_documents_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    @OneToMany(mappedBy = "pmDocuments",fetch = FetchType.EAGER)
    private List<PMProducts> pmProductsList;
}
