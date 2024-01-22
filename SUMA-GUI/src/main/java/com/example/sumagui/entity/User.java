package com.example.sumagui.entity;

import java.util.Set;

public class User {
    private String uuid;
    private String login;
    private String email;

    private String password;
    private Set<Role> role;
    private User author;
    private boolean isLock;
    private boolean isEnabled;

    public User(String uuid, String login, String email, String password, Set<Role> role, boolean isLock, boolean isEnabled) {
        this.uuid = uuid;
        this.login = login;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isLock = isLock;
        this.isEnabled = isEnabled;
    }
    public User(){}

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }

    public boolean isLock() {
        return isLock;
    }

    public void setLock(boolean lock) {
        isLock = lock;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }
}
