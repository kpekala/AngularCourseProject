package com.kpekala.recipes.auth.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kpekala.recipes.auth.rest.dto.UserDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void createsNewUser() throws Exception {

        UserDto userDto = new UserDto("test@test.pl", "test123");

        String userAsString = new ObjectMapper().writeValueAsString(userDto);

        this.mockMvc.perform(post("/api/signup")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(userAsString))
                .andExpect(status().is2xxSuccessful());
    }
}
