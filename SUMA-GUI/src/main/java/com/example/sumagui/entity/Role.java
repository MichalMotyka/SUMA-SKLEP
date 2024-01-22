package com.example.sumagui.entity;

import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleStringProperty;

public class Role {
    private SimpleStringProperty name;
    private SimpleBooleanProperty isActive;

    public Role(String name, boolean isActive) {
        this.name = new SimpleStringProperty(name);
        this.isActive = new SimpleBooleanProperty(isActive);
    }

    public String getName() {
        return name.get();
    }

    public void setName(String name) {
        this.name = new SimpleStringProperty(name);
    }

    public boolean getIsActive() {
        return isActive.get();
    }

    public void setActive(boolean active) {
        isActive = new SimpleBooleanProperty(active);
    }
}
