package com.example.suma.entity.dto;

import com.example.suma.entity.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO extends Document {
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
    private DeliverDTO deliver;
    private double fullPrice;
    private long fullQuantity;
    private String ParcelLocker;
    private List<OrderDetailsDTO> details;
}
