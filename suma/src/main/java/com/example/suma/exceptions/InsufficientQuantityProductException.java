package com.example.suma.exceptions;

public class InsufficientQuantityProductException extends RuntimeException{
    public InsufficientQuantityProductException() {
        super();
    }

    public InsufficientQuantityProductException(String message) {
        super(message);
    }

    public InsufficientQuantityProductException(String message, Throwable cause) {
        super(message, cause);
    }

    public InsufficientQuantityProductException(Throwable cause) {
        super(cause);
    }

    protected InsufficientQuantityProductException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
