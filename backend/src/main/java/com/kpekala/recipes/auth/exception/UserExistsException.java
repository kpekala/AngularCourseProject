package com.kpekala.recipes.auth.exception;

public class UserExistsException extends RuntimeException{
    public UserExistsException() {
        super("User with this email exists!");
    }
}
