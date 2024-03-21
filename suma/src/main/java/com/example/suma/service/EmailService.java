package com.example.suma.service;

import com.example.suma.configuration.EmailConfiguration;
import com.example.suma.entity.ZMDocument;
import com.google.common.base.Charsets;
import com.google.common.io.Files;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;


@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final EmailConfiguration emailConfiguration;

    @Value("${front.url}")
    private String fontendUrl;

    public void sendOrder(ZMDocument zmDocument){
        log.info("--START sendActivation");
        try{
            ClassPathResource resource = new ClassPathResource("/static/mail-order.html");
            InputStream inputStream = resource.getInputStream();
            String content = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            content = content.replace("https://google.com",fontendUrl+"/podsumowanie/"+zmDocument.getUuid());
            emailConfiguration.sendMail(zmDocument.getEmail(), content,"Złożono zamówienie",true);
        }catch (IOException e){
            log.info("Cant send mail");
            throw new RuntimeException(e);
        }
        log.info("--STOP sendActivation");
    }
}
