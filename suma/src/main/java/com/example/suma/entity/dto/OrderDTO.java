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
    private boolean invoicing;
    private String homeNumber;
    private String street;
    private String city;
    private String postCode;
    private String email;
    private String phoneNumber;
    private String info;
    private DeliverDTO deliver;
    private double fullPrice;
    private List<OrderDetailsDTO> details;
}
