package com.kpekala.recipes.auth;

import com.kpekala.recipes.auth.rest.SignUpResponse;

public interface AuthService {

    SignUpResponse signUp(String email, String password);
}
