package com.kpekala.recipes.bootstrap;

import com.kpekala.recipes.ingredient.IngredientEntity;
import com.kpekala.recipes.ingredient.IngredientRepository;
import com.kpekala.recipes.recipe.RecipeEntity;
import com.kpekala.recipes.recipe.RecipeRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    @PostConstruct
    @Transactional
    public void initData() {
        var ingredients = List.of(
                new IngredientEntity("Beer", 6),
                new IngredientEntity("Bread", 12),
                new IngredientEntity("flour", 42),
                new IngredientEntity("water", 62),
                new IngredientEntity("Salt", 12)
        );

        var recipes = List.of(
          new RecipeEntity("https://piekarniagrzybki.pl/wp-content/uploads/2019/06/kanapka_ze_schabem.jpg", "Sandwitch", "Super tasty sandwitch", List.of(ingredients.get(0), ingredients.get(1))),
          new RecipeEntity("https://i.wpimg.pl/1200x/d.wpimg.pl/731814183--1113973156/smalec.jpeg", "Smalec", "Super tasty smalec", List.of(ingredients.get(2), ingredients.get(3))),
          new RecipeEntity("https://akademiasmaku.pl/upload/vademecums/888/big/jak-zrobic-kebaba-888.jpg", "Kebab", "Super tasty kebab", List.of(ingredients.get(1), ingredients.get(2), ingredients.get(3)))
        );

        recipeRepository.saveAll(recipes);
    }
}
