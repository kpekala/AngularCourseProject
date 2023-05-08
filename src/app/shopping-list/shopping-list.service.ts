import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService{

  onAddNewIngredient = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {}  

  getIngredients(){
    return this.ingredients.slice();
  }

  addNewIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.onAddNewIngredient.emit(this.ingredients.slice());
  }
}