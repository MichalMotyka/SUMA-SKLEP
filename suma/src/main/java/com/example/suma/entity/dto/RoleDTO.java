package com.example.suma.entity.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class RoleDTO {
    private String name;
    @JsonProperty
    private boolean isActive;


}
