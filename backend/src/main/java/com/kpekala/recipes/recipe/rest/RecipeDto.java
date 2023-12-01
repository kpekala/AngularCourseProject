package com.kpekala.recipes.recipe.rest;

import com.kpekala.recipes.ingredient.IngredientDto;

import java.util.List;

public record RecipeDto(String name, String description, String imageUrl, List<IngredientDto> ingredients) {
}
