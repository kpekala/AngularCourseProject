import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Data, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  TO_SHOPPING_LIST_LABEL = 'To shopping list';
  EDIT_RECIPE_LABEL = 'Edit Recipe';
  DELETE_RECIPE_LABEL = 'Delete Recipe';
  
  menuLabels = [this.TO_SHOPPING_LIST_LABEL, this.EDIT_RECIPE_LABEL, this.DELETE_RECIPE_LABEL];
  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data['recipe'];
    })
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
