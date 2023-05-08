import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService]
})
export class RecipesComponent{
  isRecipeSelected = false;
  @Input() selectedRecipe!: Recipe;

  
  onClickRecipe(clickedRecipe: Recipe) {
    this.isRecipeSelected = true;
    this.selectedRecipe = clickedRecipe;
  }
}
