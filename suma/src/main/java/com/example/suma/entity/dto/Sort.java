package com.example.suma.entity.dto;

public enum Sort {
    PRICE("price"),
    CATEGORY("category"),
    NAME("name");
    Sort(String value){
        this.label = value;
    }

    private final String label;

    public String getLabel() {
        return label;
    }
}
