package com.example.suma.exceptions;

public class CategoryAlreadyExistException extends RuntimeException{
    public CategoryAlreadyExistException() {
        super();
    }

    public CategoryAlreadyExistException(String message) {
        super(message);
    }

    public CategoryAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public CategoryAlreadyExistException(Throwable cause) {
        super(cause);
    }

    protected CategoryAlreadyExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
