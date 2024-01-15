package com.example.sumagui.entity;

import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class Response {
    private final String timestamp;
    private final String message;
    private final String code;

    public Response(String code) {
        this.timestamp = String.valueOf(new Timestamp(System.currentTimeMillis()));
        this.message = code;
        this.code = code;
    }

    public Response(String message,String code) {
        this.timestamp = String.valueOf(new Timestamp(System.currentTimeMillis()));
        this.message = message;
        this.code = code;
    }
}
