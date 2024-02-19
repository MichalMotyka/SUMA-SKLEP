package com.example.suma.mediator;

import com.example.suma.entity.ZMDocument;
import com.example.suma.entity.dto.OrderDTO;
import com.example.suma.service.ZMDocumentService;
import com.example.suma.translators.ZMDocumentTranslator;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DocumentsMediator {
    private final ZMDocumentTranslator zmDocumentTranslator;
    private final ZMDocumentService zmDocumentService;
    public void createOrder(OrderDTO orderDTO, Cookie[] cookies) {
        ZMDocument zmDocument = zmDocumentTranslator.translateOrder(orderDTO);
        zmDocumentService.create(zmDocument);
    }




    public String getBasketCookie(Cookie[] cookies){
        if (cookies.length > 0){

        }
    }
}
