package com.kpekala.recipes.ingredient;

import java.util.List;

public class IngredientMapper {
    public static List<IngredientDto> toIngredients(List<IngredientEntity> ingredientEntities) {
        return ingredientEntities.stream().map(ingredientEntity -> new IngredientDto(ingredientEntity.getName(),
                        ingredientEntity.getAmount()))
                .toList();
    }

    public static List<IngredientEntity> toIngredientEntities(List<IngredientDto> ingredientDtos) {
        return ingredientDtos.stream().map(i -> new IngredientEntity(i.name(),
                        i.amount()))
                .toList();
    }
}
