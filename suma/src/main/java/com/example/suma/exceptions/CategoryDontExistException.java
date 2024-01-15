package com.example.suma.exceptions;

public class CategoryDontExistException extends RuntimeException{

    public CategoryDontExistException() {
        super();
    }

    public CategoryDontExistException(String message) {
        super(message);
    }

    public CategoryDontExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public CategoryDontExistException(Throwable cause) {
        super(cause);
    }

    protected CategoryDontExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
