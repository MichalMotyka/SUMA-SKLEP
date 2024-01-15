package com.example.suma.exceptions;

public class SupercategoryNotEmptyException extends RuntimeException{
    public SupercategoryNotEmptyException() {
        super();
    }

    public SupercategoryNotEmptyException(String message) {
        super(message);
    }

    public SupercategoryNotEmptyException(String message, Throwable cause) {
        super(message, cause);
    }

    public SupercategoryNotEmptyException(Throwable cause) {
        super(cause);
    }

    protected SupercategoryNotEmptyException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
