import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipesService{

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'test description', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
        new Recipe('A test recipe 2', 'test description 2', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
    ];
    
    
    constructor() {}  

    getRecipes() {
        return this.recipes.slice();
    }
}