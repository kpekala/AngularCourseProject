import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  TO_SHOPPING_LIST_LABEL = 'To shopping list';
  EDIT_RECIPE_LABEL = 'Edit Recipe';
  DELETE_RECIPE_LABEL = 'Delete Recipe';
  
  menuLabels = [this.TO_SHOPPING_LIST_LABEL, this.EDIT_RECIPE_LABEL, this.DELETE_RECIPE_LABEL];
  recipe: Recipe;

  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router,
              private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.id);
      }
    )
  }

  onDropdownItemClick(itemName: string){
    if (itemName === this.TO_SHOPPING_LIST_LABEL){
      this.shoppingListService.addNewIngredients(this.recipe.ingredients);
    }
    if(itemName === this.EDIT_RECIPE_LABEL){
      this.router.navigate(['edit'], {relativeTo: this.route});
    }
  }
}
