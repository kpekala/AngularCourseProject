package com.kpekala.recipes.auth.exception;

public class WrongTokenException extends RuntimeException{
    public WrongTokenException() {
        super("Invalid token!");
    }
}
