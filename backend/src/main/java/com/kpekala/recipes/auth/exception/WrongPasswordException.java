package com.kpekala.recipes.auth.exception;

public class WrongPasswordException extends RuntimeException{
    public WrongPasswordException() {
        super("Wrong password!");
    }
}
