package com.kpekala.recipes.recipes.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "RECIPES")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class RecipeEntity {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    private String name;

    private String description;

    @OneToMany
    private List<IngredientEntity> ingredients;
}
