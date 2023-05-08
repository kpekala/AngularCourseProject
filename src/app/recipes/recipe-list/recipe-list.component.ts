import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  @Output() recipeClick = new EventEmitter<Recipe>();
  recipes: Recipe[];

  constructor(private recipeService: RecipesService){

  }

  ngOnInit(){
    this.recipes = this.recipeService.getRecipes();
  }

  onClickRecipe(recipeIndex: number) {
    let recipe = this.recipes[recipeIndex];
    this.recipeClick.emit(recipe);
  }
}
