package com.example.suma.translators;


import com.example.suma.entity.Deliver;
import com.example.suma.entity.dto.DeliverDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mappings;

@Mapper
public abstract class DeliverTranslator {

    @Mappings({})
    public abstract DeliverDTO toDeliver(Deliver deliver);
}
