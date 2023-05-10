import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

export class RecipesService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Pierogi ruskie',
      'Pyszne ruskie pierogi - klasyczne polskie danie',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Ruskie_pierogi_skansen_wsi_radomskiej.jpg/1920px-Ruskie_pierogi_skansen_wsi_radomskiej.jpg',
      [new Ingredient('Mąka', 1), new Ingredient('Ser biały kg', 2), new Ingredient('Cebula kg', 2)]),
    new Recipe('Kotlet mielony ',
      'Tradycyjny polski kotlet mielony - smażony',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/2023_Kotlety_mielone.jpg/1920px-2023_Kotlety_mielone.jpg',
      [new Ingredient('Mięso kg', 1), new Ingredient('Olej ml', 200)])
  ];


  constructor() {
  }

  getRecipes() {
    return this.recipes.slice();
  }
}
