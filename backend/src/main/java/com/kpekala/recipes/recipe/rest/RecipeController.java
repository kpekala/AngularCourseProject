package com.kpekala.recipes.recipe.rest;

import com.kpekala.recipes.auth.AuthService;
import com.kpekala.recipes.recipe.RecipeEntity;
import com.kpekala.recipes.recipe.RecipeMapper;
import com.kpekala.recipes.recipe.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/recipes")
public class RecipeController {

    private final AuthService authService;

    private final RecipeRepository recipeRepository;

    @GetMapping()
    public List<RecipeDto> getRecipes(@RequestParam String auth) {
        authService.validateToken(auth);

        List<RecipeEntity> recipeEntities = recipeRepository.findAll();

        return RecipeMapper.toRecipes(recipeEntities);
    }

    @PutMapping()
    public void setRecipes(@RequestParam String auth, @RequestBody List<RecipeDto> recipeDtos) {
        authService.validateToken(auth);

        List<RecipeEntity> recipeEntities = RecipeMapper.toRecipeEntities(recipeDtos);

        recipeRepository.deleteAll();
        recipeRepository.saveAll(recipeEntities);
    }
}
