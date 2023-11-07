package com.kpekala.recipes.auth.rest;

import com.kpekala.recipes.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("api/signup")
    public SignUpResponse signUp(@RequestBody SignUpRequest request){
        return authService.signUp(request.email(), request.password());
    }
}
