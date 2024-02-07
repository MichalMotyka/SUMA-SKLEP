package com.example.suma.exceptions;

public class ProductDontExistException extends RuntimeException{
    public ProductDontExistException() {
        super();
    }

    public ProductDontExistException(String message) {
        super(message);
    }

    public ProductDontExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProductDontExistException(Throwable cause) {
        super(cause);
    }

    protected ProductDontExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
