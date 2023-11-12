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
        String stringRequest = new ObjectMapper().writeValueAsString(request);

        // Act
        userRepository.save(user);

        ResultActions resultActions = this.mockMvc.perform(post("/api/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(stringRequest));

        // Assert
        resultActions.andExpect(status().is4xxClientError());
    }

    @Test
    public void testLogin_whenUserExists_loginSuccessfully() throws Exception {
        // Assume
        String userEmail = "test@test.pl";
        String userPassword = "test123";
        UserEntity user = new UserEntity(userEmail, userPassword);

        // Act
        userRepository.save(user);

        LoginRequest request = new LoginRequest(userEmail, userPassword);
        String stringRequest = new ObjectMapper().writeValueAsString(request);

        ResultActions resultActions = this.mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(stringRequest));

        // Assert
        resultActions.andExpect(status().isOk());
    }

    @Test
    public void testLogin_whenUserDoesNotExist_return4xx() throws Exception {
        // Assume
        String userEmail = "test@test.pl";
        String userPassword = "test123";

        // Act
        LoginRequest request = new LoginRequest(userEmail, userPassword);
        String stringRequest = new ObjectMapper().writeValueAsString(request);

        ResultActions resultActions = this.mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(stringRequest));

        // Assert
        resultActions.andExpect(status().is4xxClientError());
    }

    @Test
    public void testLogin_whenWrongPassword_return4xx() throws Exception {
        // Assume
        String userEmail = "test@test.pl";
        String userPassword = "test123";

        // Act
        UserEntity user = new UserEntity(userEmail, userPassword);
        userRepository.save(user);

        LoginRequest request = new LoginRequest(userEmail, "test1234");
        String stringRequest = new ObjectMapper().writeValueAsString(request);

        ResultActions resultActions = this.mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(stringRequest));

        // Assert
        resultActions.andExpect(status().is4xxClientError());
    }
}
