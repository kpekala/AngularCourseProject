package com.kpekala.recipes.auth.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kpekala.recipes.auth.user.UserEntity;
import com.kpekala.recipes.auth.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSignUp_createsNewUser() throws Exception {

        SignUpRequest userDto = new SignUpRequest("test@test.pl", "test123");

        String userAsString = new ObjectMapper().writeValueAsString(userDto);

        this.mockMvc.perform(post("/api/signup")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(userAsString))
                .andExpect(status().is2xxSuccessful());

        List<UserEntity> users = userRepository.findByEmail(userDto.email());
        assertThat(users).hasSize(1);
    }
}
