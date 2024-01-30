package com.example.suma.entity.dto;

public enum Order {
    DESC("desc"),
    ASC("asc");
    Order(String value){
        this.label = value;
    }

    private final String label;

    public String getLabel() {
        return label;
    }
}
