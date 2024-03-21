package com.example.suma.entity;

import lombok.*;

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
