import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  TO_SHOPPING_LIST_LABEL: string = 'To shopping list';

  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute) {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data['recipe'];
    })
  }


  onDropdownItemClick(itemName: string){
    if (itemName === this.TO_SHOPPING_LIST_LABEL){
      this.shoppingListService.addNewIngredients(this.recipe.ingredients);
    }
  }
}
