package com.example.suma.exceptions;

public class ProductMaxSixPropertiesException extends RuntimeException{
    public ProductMaxSixPropertiesException() {
        super();
    }

    public ProductMaxSixPropertiesException(String message) {
        super(message);
    }

    public ProductMaxSixPropertiesException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProductMaxSixPropertiesException(Throwable cause) {
        super(cause);
    }

    protected ProductMaxSixPropertiesException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
