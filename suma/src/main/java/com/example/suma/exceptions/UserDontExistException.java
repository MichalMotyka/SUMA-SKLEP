package com.example.suma.exceptions;

public class UserDontExistException extends RuntimeException{
    public UserDontExistException() {
        super();
    }

    public UserDontExistException(String message) {
        super(message);
    }

    public UserDontExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserDontExistException(Throwable cause) {
        super(cause);
    }

    protected UserDontExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
