package com.example.suma.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PayuResponse {
    private StatusPayU status;
    private String redirectUri;
    private String orderId;
    private String extOrderId;
}
