package com.example.suma.translators;

import com.example.suma.entity.WMDocuments;
import com.example.suma.entity.dto.DocumentDTO;
import com.example.suma.entity.dto.ProductDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper
public abstract class DocumentToWMDocument {

    @Mappings({})
    public abstract WMDocuments translate(DocumentDTO document);

    @Mappings({})
    public abstract DocumentDTO translateToDTO(WMDocuments document);


}
