package com.example.suma.exceptions;

public class MinimumQuantityException extends RuntimeException{
    public MinimumQuantityException() {
        super();
    }

    public MinimumQuantityException(String message) {
        super(message);
    }

    public MinimumQuantityException(String message, Throwable cause) {
        super(message, cause);
    }

    public MinimumQuantityException(Throwable cause) {
        super(cause);
    }

    protected MinimumQuantityException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
