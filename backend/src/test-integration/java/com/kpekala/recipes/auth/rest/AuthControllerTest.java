package com.kpekala.recipes.auth.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kpekala.recipes.auth.user.UserEntity;
import com.kpekala.recipes.auth.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

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

    @BeforeEach
    public void beforeEach() {
        userRepository.deleteAll();
    }

    @Test
    public void testSignUp_createsNewUser() throws Exception {
        // Assume
        SignUpRequest request = new SignUpRequest("test@test.pl", "test123");

        String userAsString = new ObjectMapper().writeValueAsString(request);

        // Act
        ResultActions resultActions = this.mockMvc.perform(post("/api/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userAsString));

        // Assert
        resultActions.andExpect(status().is2xxSuccessful());

        List<UserEntity> users = userRepository.findByEmail(request.email());
        assertThat(users).hasSize(1);
    }

    @Test
    public void testSignUp_whenUserIsAlreadyCreated_returns4xx() throws Exception {
        // Assume
        SignUpRequest request = new SignUpRequest("test@test.pl", "test123");
        UserEntity user = new UserEntity("test@test.pl", "test123");
        String userAsString = new ObjectMapper().writeValueAsString(request);

        // Act
        userRepository.save(user);

        ResultActions resultActions = this.mockMvc.perform(post("/api/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userAsString));

        // Assert
        resultActions.andExpect(status().is4xxClientError());
    }
}
