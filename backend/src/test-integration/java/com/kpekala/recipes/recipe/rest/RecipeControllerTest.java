package com.kpekala.recipes.recipe.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kpekala.recipes.auth.AuthService;
import com.kpekala.recipes.recipe.RecipeEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class RecipeControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthService authService;

    private String adminToken;

    @BeforeEach
    public void setup() {
        var response = authService.login("admin", "admin");
        adminToken = response.token();
    }

    @Test
    public void testGetRecipes_receivesDefaultRecipes() throws Exception {
        var result = mockMvc.perform(get("/api/recipes")
                .contentType(MediaType.APPLICATION_JSON).param("auth", adminToken))
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        String content = result.getResponse().getContentAsString();

        List<RecipeEntity> recipes = new ObjectMapper().readValue(content, new TypeReference<>() {});
        assertThat(recipes).hasSize(2);

    }
}
