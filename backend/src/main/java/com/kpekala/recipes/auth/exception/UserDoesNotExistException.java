package com.kpekala.recipes.auth.exception;

public class UserDoesNotExistException extends RuntimeException{
    public UserDoesNotExistException() {
        super("User with this email does not exists!");
    }
}
