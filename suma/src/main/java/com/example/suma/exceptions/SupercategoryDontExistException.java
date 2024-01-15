package com.example.suma.exceptions;

public class SupercategoryDontExistException extends RuntimeException{
    public SupercategoryDontExistException() {
        super();
    }

    public SupercategoryDontExistException(String message) {
        super(message);
    }

    public SupercategoryDontExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public SupercategoryDontExistException(Throwable cause) {
        super(cause);
    }

    protected SupercategoryDontExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
