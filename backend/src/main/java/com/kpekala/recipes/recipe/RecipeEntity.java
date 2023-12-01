package com.kpekala.recipes.recipe;

import com.kpekala.recipes.ingredient.IngredientEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "RECIPES")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class RecipeEntity {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    private String name;

    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    private List<IngredientEntity> ingredients;

    public RecipeEntity(String imageUrl, String name, String description, List<IngredientEntity> ingredients) {
        this.imageUrl = imageUrl;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
    }

}
