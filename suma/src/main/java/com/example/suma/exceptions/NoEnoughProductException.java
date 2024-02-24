package com.example.suma.exceptions;

public class NoEnoughProductException extends RuntimeException{
    public NoEnoughProductException() {
    }

    public NoEnoughProductException(String message) {
        super(message);
    }

    public NoEnoughProductException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoEnoughProductException(Throwable cause) {
        super(cause);
    }

    public NoEnoughProductException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
