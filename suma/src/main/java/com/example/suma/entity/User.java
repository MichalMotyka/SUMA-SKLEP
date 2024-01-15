package com.example.suma.entity;

import jakarta.persistence.*;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Setter
@Table(name = "users",schema = "suma")
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(generator = "users_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "users_id_seq",sequenceName = "users_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    private String uuid;
    private String login;
    private String email;
    private String password;
    @OneToMany(mappedBy="user",fetch = FetchType.EAGER)
    private Set<Authorities> role;
    @Column(name = "islock")
    private boolean isLock;
    @Column(name = "isenabled")
    private boolean isEnabled;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "author")
    private User author;

    public User(){
        generateUuid();
    }
    public User(long id, String uuid, String login, String email, String password, Set<Authorities> role, boolean isLock, boolean isEnabled,User author) {
        this.id = id;
        this.uuid = uuid;
        this.login = login;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isLock = isLock;
        this.isEnabled = isEnabled;
        this.author = author;
        generateUuid();
    }
    public Set<Authorities> getRole(){
        return this.role;
    }
    public String getUuid(){
        return this.uuid;
    }
    private long getId(){
        return id;
    }
    public String getEmail() {
        return email;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.stream().map(value -> new SimpleGrantedAuthority(value.getRole().name())).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLock;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
    private void generateUuid(){
        if (uuid == null || uuid.equals("")){
            setUuid(UUID.randomUUID().toString());
        }
    }
}