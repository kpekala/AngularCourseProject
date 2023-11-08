package com.kpekala.recipes.auth.rest;

import com.kpekala.recipes.auth.AuthService;
import com.kpekala.recipes.auth.exception.UserExistsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
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

    @ExceptionHandler({UserExistsException.class})
    public ResponseEntity<?> handleException(){
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
}
