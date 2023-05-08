import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput', {static: true}) nameInput!: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput!: ElementRef;

  constructor(private shoppingListService: ShoppingListService){}

  onAddItem() {
    let name = this.nameInput.nativeElement.value;
    let amount = Number(this.amountInput.nativeElement.value);
    let ingredient = new Ingredient(name, amount);
    this.shoppingListService.addNewIngredient(ingredient);
  }
}
