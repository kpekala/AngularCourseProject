import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'test description', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
    new Recipe('A test recipe 2', 'test description 2', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];

  @Output() recipeClick = new EventEmitter<Recipe>();
  onClickRecipe(recipeIndex: number) {
    let recipe = this.recipes[recipeIndex];
    this.recipeClick.emit(recipe);
  }
}
