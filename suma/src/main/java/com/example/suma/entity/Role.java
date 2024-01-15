package com.example.suma.entity;

public enum Role {
    ROLE_USER("User"),
    ROLE_ADMIN("Administrator");

    private final String value;
    private Role(String value) {
        this.value = value;
    }

    public String getValue(){
        return this.value;
    }
    public static Role findByValue(String value) {
        Role result = null;
        for (Role role : values()) {
            if (role.getValue().equalsIgnoreCase(value)) {
                result = role;
                break;
            }
        }
        return result;
    }
}
