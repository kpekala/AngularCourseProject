import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  TO_SHOPPING_LIST_LABEL: string = 'To shopping list';

  constructor(private shoppingListService: ShoppingListService) {}


  onDropdownItemClick(itemName: string){
    if (itemName === this.TO_SHOPPING_LIST_LABEL){
      this.shoppingListService.addNewIngredients(this.recipe.ingredients);
    }
  }
}
