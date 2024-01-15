package com.example.suma.entity.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryDTO {
    private String uuid;
    @NotBlank(message = "Nazwa jest wymagana")
    private String name;
    private List<CategoryDTO> subcategoriesy;
    private String supercategory;
}
