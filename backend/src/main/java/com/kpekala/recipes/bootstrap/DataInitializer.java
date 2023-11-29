package com.kpekala.recipes.bootstrap;

import com.kpekala.recipes.ingredient.IngredientEntity;
import com.kpekala.recipes.ingredient.IngredientRepository;
import com.kpekala.recipes.recipe.RecipeEntity;
import com.kpekala.recipes.recipe.RecipeRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    @PostConstruct
    public void initData() {
        var ingredients = List.of(
                new IngredientEntity("Beer", 6),
                new IngredientEntity("Bread", 12),
                new IngredientEntity("flour", 42),
                new IngredientEntity("water", 62),
                new IngredientEntity("Salt", 12)
        );

        ingredientRepository.saveAll(ingredients);

        var recipes = List.of(
          new RecipeEntity("", "Sandwitch", "Super tasty sandwitch", List.of(ingredients.get(0), ingredients.get(1))),
          new RecipeEntity("", "Smalec", "Super tasty smalec", List.of(ingredients.get(2), ingredients.get(3)))
        );

        recipeRepository.saveAll(recipes);
    }

}
