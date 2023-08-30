import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{

  @ViewChild('f', {static: false}) slForm: NgForm;
  startedEditingSubscription: Subscription;

  editMode = false;
  editingItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editingItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });    
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    let ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editingItemIndex, ingredient);
    }
    else{
      this.shoppingListService.addNewIngredient(ingredient);
    }
    this.onClearForm();
  }

  onClearForm(){
    this.slForm.reset();
    this.editMode = false;
    this.editedItem = null;
  }

  onDeleteItem(){
    this.shoppingListService.deleteItem(this.editingItemIndex);
    this.onClearForm();
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }
 
  
}
