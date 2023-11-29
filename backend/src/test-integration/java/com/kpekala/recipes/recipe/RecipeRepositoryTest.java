package com.kpekala.recipes.recipe;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class RecipeRepositoryTest {

    @Autowired
    private RecipeRepository recipeRepository;

    @AfterEach
    public void afterEach() {
        recipeRepository.deleteAll();
    }

    @Test
    public void testGetRecipes_receivesDefaultRecipes() {
        var recipes = recipeRepository.findAll();
        assertThat(recipes).hasSize(2);
    }
}
