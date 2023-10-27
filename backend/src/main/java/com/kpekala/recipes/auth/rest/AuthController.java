package com.kpekala.recipes.auth.rest;

import com.kpekala.recipes.auth.AuthService;
import com.kpekala.recipes.auth.rest.dto.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("api/signup")
    public ResponseEntity<Object> signUp(@RequestBody UserDto user){
        return ResponseEntity.accepted().body(true);
    }
}
