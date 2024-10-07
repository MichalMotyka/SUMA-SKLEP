package com.example.suma.entity.dto;

import com.example.suma.entity.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDTO {
    private String type;
    private String uuid;
    private String createDate;
    private State state;
    private List<ProductDTO> products;
}
