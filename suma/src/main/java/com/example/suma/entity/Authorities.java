package com.example.suma.entity;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_roles",schema = "suma")
@Entity
public class Authorities {
    @Id
    @GeneratedValue(generator = "user_roles_id_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "user_roles_id_seq",sequenceName = "user_roles_id_seq",allocationSize = 1,schema = "suma")
    private long id;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    @Enumerated(EnumType.STRING)
    private Role role;
}
