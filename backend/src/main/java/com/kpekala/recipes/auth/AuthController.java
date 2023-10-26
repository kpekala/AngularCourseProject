package com.kpekala.recipes.auth;

import com.kpekala.recipes.auth.dto.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthController {

    @PostMapping("api/signup")
    public void signUp(@RequestBody UserDto user){
        log.info(user.toString());
    }
}
