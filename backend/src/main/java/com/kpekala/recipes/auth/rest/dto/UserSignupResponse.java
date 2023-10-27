package com.kpekala.recipes.auth.rest.dto;

public record UserSignupResponse(String token, String expirationDate) {
}
