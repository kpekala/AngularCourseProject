import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService{

  onIngredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {}

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addNewIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.onIngredientsChanged.next(this.ingredients.slice());
  }

  addNewIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.onIngredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.onIngredientsChanged.next(this.ingredients);
  }

  deleteItem(index: number) {
    this.ingredients.splice(index,  1);
    this.onIngredientsChanged.next(this.ingredients);
  }
}
