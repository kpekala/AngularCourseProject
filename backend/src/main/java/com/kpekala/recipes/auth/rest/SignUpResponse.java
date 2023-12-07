package com.kpekala.recipes.auth.rest;

public record SignUpResponse(String token, Long expiresIn) {
}
