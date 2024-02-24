package com.example.sumasheduler.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "zm_documents",schema = "suma")
@Inheritance(strategy= InheritanceType.SINGLE_TABLE)
public class ZMDocument extends Document{
    @Id
    @GeneratedValue(generator = "zm_documents_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "zm_documents_id_seq",sequenceName = "zm_documents_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String name;
    private String surname;
    private String companyName;
    private String nip;
    private String homeNumber;
    private String street;
    private String city;
    private String postCode;
    private boolean invoicing;
    private String invoicingName;
    private String invoicingSurname;
    private String invoicingCompanyName;
    private String invoicingNip;
    private String invoicingHomeNumber;
    private String invoicingStreet;
    private String invoicingCity;
    private String invoicingPostCode;
    private String email;
    private String phoneNumber;
    private String info;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "deliver")
    private Deliver deliver;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private WMDocuments document;


    public ZMDocument(long id,
                      String uuid,
                      LocalDate createDate,
                      State state,
                      String name,
                      String surname,
                      String companyName,
                      String nip,
                      boolean invoicing,
                      String homeNumber,
                      String street,
                      String city,
                      String postCode,
                      String email,
                      String phoneNumber,
                      String info,
                      WMDocuments document) {
        super(uuid, createDate, state);
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.companyName = companyName;
        this.nip = nip;
        this.invoicing = invoicing;
        this.homeNumber = homeNumber;
        this.street = street;
        this.city = city;
        this.postCode = postCode;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.info = info;
        this.document = document;
    }

    public ZMDocument() {

    }
}
