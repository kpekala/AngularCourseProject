package com.kpekala.recipes.ingredient;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "INGREDIENTS")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class IngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int amount;

    public IngredientEntity(String name, int amount) {
        this.name = name;
        this.amount = amount;
    }
}
