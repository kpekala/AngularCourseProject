package com.kpekala.recipes.recipe.model;

import com.kpekala.recipes.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/recipes")
public class RecipeController {

    private final AuthService authService;

    private final RecipeRepository recipeRepository;

    @GetMapping()
    public List<RecipeEntity> getRecipes(@RequestParam String auth) {
        authService.validateToken(auth);

        return recipeRepository.findAll();
    }
}
