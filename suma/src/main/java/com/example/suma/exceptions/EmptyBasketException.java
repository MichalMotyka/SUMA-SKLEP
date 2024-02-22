package com.example.suma.exceptions;

public class EmptyBasketException extends RuntimeException{
    public EmptyBasketException() {
    }

    public EmptyBasketException(String message) {
        super(message);
    }

    public EmptyBasketException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmptyBasketException(Throwable cause) {
        super(cause);
    }

    public EmptyBasketException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
