package com.example.suma.service;


import com.example.suma.entity.*;
import com.example.suma.exceptions.PayUException;
import com.example.suma.translators.WMDocumentsToPayuProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
@RequiredArgsConstructor
public class PayuService {

    private final WMDocumentsToPayuProduct wmDocumentsToPayuProduct;
    private final RestTemplate restTemplate;
    @Value("${payu.client-id}")
    private String client_id;
    @Value("${payu.client-secret}")
    private String client_secret;
    @Value("${payu.url.notf}")
    private String payu_url_notf;
    @Value("${payu.url.auth}")
    private String payu_url_auth;
    @Value("${payu.url.order}")
    private String payu_url_order;
    private String token;


    private void login() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "client_credentials");
        map.add("client_id", client_id);
        map.add("client_secret", client_secret);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

        ResponseEntity<PayUAuth> response =
                restTemplate.exchange(payu_url_auth,
                        HttpMethod.POST,
                        entity,
                        PayUAuth.class);
        if (response.getStatusCode().isError()) throw new PayUException();
        token = "Bearer " + response.getBody().getAccess_token();
    }


    public PayuResponse createOrder(ZMDocument zmDocument) throws HttpClientErrorException {
        try {
            return sendOrder(zmDocument).getBody() ;
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 401) {
                login();
                return sendOrder(zmDocument).getBody();
            }
        }
        return null;
    }

    private ResponseEntity<PayuResponse> sendOrder(ZMDocument zmDocument) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization", token);

        HttpEntity<PayUOrder> requestEntity = new HttpEntity<>(prepareOrder(zmDocument), headers);
        return restTemplate.exchange(payu_url_order, HttpMethod.POST, requestEntity, PayuResponse.class);
    }

    private PayUOrder prepareOrder(ZMDocument zmDocument) {
        AtomicLong totalprice = new AtomicLong();
        List<PayuProduct> product = zmDocument.getDocument().getWmProductsList().stream().map(wmDocumentsToPayuProduct::toPayuProduct).toList();
        product.forEach(value -> totalprice.set(value.getUnitPrice() * value.getQuantity() * 100));
        PayUBuyer buyer = new PayUBuyer(zmDocument.getEmail(), zmDocument.getPhoneNumber(), zmDocument.getName(), zmDocument.getSurname());
        return new PayUOrder(payu_url_notf,
                "127.0.0.1",
                client_id,
                zmDocument.getUuid(),
                "PLN",
                totalprice.get(),
                zmDocument.getUuid(),
                buyer,
                product);
    }
}

