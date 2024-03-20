package com.example.suma.service;

import com.example.suma.configuration.EmailConfiguration;
import com.example.suma.entity.ZMDocument;
import com.google.common.base.Charsets;
import com.google.common.io.Files;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;


@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final EmailConfiguration emailConfiguration;

    @Value("${front.url}")
    private String fontendUrl;

    @Value("classpath:static/mail-order.html")
    private Resource orderTemplate;


    public void sendOrder(ZMDocument zmDocument){
        log.info("--START sendActivation");
        try{
            String html = Files.toString(orderTemplate.getFile(), Charsets.UTF_8);
            html = html.replace("https://google.com",fontendUrl+"/podsumowanie/"+zmDocument.getUuid());
            emailConfiguration.sendMail(zmDocument.getEmail(), html,"Złożono zamówienie",true);
        }catch (IOException e){
            log.info("Cant send mail");
            throw new RuntimeException(e);
        }
        log.info("--STOP sendActivation");
    }
}
