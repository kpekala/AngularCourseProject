package com.kpekala.recipes.recipe;

import com.kpekala.recipes.ingredient.IngredientMapper;
import com.kpekala.recipes.recipe.rest.RecipeDto;

import java.util.List;

public class RecipeMapper {

    public static List<RecipeDto> toRecipes(List<RecipeEntity> recipeEntities) {
        return recipeEntities.stream()
                .map(r -> new RecipeDto(r.getName(),
                        r.getDescription(),
                        r.getImageUrl(),
                        IngredientMapper.toIngredients(r.getIngredients())))
                .toList();
    }

    public static List<RecipeEntity> toRecipeEntities(List<RecipeDto> recipeDtos) {
        return recipeDtos.stream()
                .map(r -> new RecipeEntity(r.imageUrl(),
                        r.name(),
                        r.description(),
                        IngredientMapper.toIngredientEntities(r.ingredients())))
                .toList();
    }
}
