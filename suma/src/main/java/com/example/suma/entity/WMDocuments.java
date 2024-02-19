package com.example.suma.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "wm_documents",schema = "suma")
@Inheritance(strategy= InheritanceType.SINGLE_TABLE)
public class WMDocuments extends Document{
    @Id
    @GeneratedValue(generator = "wm_documents_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "wm_documents_id_seq",sequenceName = "wm_documents_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    @OneToMany(mappedBy = "wmDocuments",fetch = FetchType.EAGER)
    private List<WMProducts> wmProductsList;

    public WMDocuments(String uuid, LocalDate createDate, State state, long id, List<WMProducts> wmProductsList) {
        super(uuid, createDate, state);
        this.id = id;
        this.wmProductsList = wmProductsList;
    }
    public WMDocuments() {
    }
}
