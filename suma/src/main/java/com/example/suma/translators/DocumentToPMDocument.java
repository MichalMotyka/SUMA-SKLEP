package com.example.suma.translators;

import com.example.suma.entity.PMDocument;
import com.example.suma.entity.dto.DocumentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mappings;


@Mapper
public abstract class DocumentToPMDocument {

    @Mappings({})
    public abstract PMDocument translate(DocumentDTO document);

    public abstract DocumentDTO translateToDTO(PMDocument pmDocument);
}
