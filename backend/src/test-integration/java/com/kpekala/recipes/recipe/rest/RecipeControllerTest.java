package com.kpekala.recipes.recipe.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kpekala.recipes.auth.AuthService;
import com.kpekala.recipes.ingredient.IngredientDto;
import com.kpekala.recipes.recipe.RecipeEntity;
import com.kpekala.recipes.recipe.RecipeRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class RecipeControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthService authService;

    @Autowired
    private RecipeRepository recipeRepository;

    private String adminToken;

    @BeforeEach
    public void setup() {
        var response = authService.login("admin", "admin");
        adminToken = response.token();
    }

    @Test
    @Order(1)
    public void testGetRecipes_receivesDefaultRecipes() throws Exception {
        var result = mockMvc.perform(get("/api/recipes")
                .contentType(MediaType.APPLICATION_JSON).param("auth", adminToken))
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        String content = result.getResponse().getContentAsString();

        List<RecipeEntity> recipes = new ObjectMapper().readValue(content, new TypeReference<>() {});
        assertThat(recipes).hasSize(2);
    }

    @Test
    @Transactional
    public void testSetRecipes() throws Exception {
        recipeRepository.deleteAll();

        var ingredientDtos = List.of(
                new IngredientDto("Beer", 6)
        );
        var recipeDtos = List.of(
                new RecipeDto("pizza","I prefer pizza to avocado","", ingredientDtos)
        );

        String recipeDtosString = new ObjectMapper().writeValueAsString(recipeDtos);

        mockMvc.perform(put("/api/recipes")
                .contentType(MediaType.APPLICATION_JSON).param("auth", adminToken)
                        .content(recipeDtosString))
                .andExpect(status().is2xxSuccessful());

        var recipes = recipeRepository.findAll();
        assertThat(recipes).hasSize(1);
        var recipe = recipes.get(0);
        assertThat(recipe).matches(r -> r.getName().equals("pizza"));
        System.out.println(recipes.get(0));

    }
}
