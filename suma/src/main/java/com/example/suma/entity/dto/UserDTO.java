package com.example.suma.entity.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserDTO {
    private String uuid;
    @NotBlank(message = "Login jest wymagany")
    private String login;
    @NotBlank(message = "Email jest wymagany")
    @Email(message = "Email jest nieprawidłowy")
    private String email;
    @NotBlank(message = "Hasło jest wymagane")
    private String password;
    private Set<RoleDTO> role;
    private UserDTO author;
    private boolean isLock;
    private boolean isEnabled;
}
