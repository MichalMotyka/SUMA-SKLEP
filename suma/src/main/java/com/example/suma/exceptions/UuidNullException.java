package com.example.suma.exceptions;

public class UuidNullException extends RuntimeException{
    public UuidNullException(String message) {
        super(message);
    }

    public UuidNullException(String message, Throwable cause) {
        super(message, cause);
    }

    public UuidNullException(Throwable cause) {
        super(cause);
    }

    protected UuidNullException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
