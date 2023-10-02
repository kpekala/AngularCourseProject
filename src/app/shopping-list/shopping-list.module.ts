import { NgModule } from "@angular/core";
import { IngredientComponent } from "./ingredient/ingredient.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
        IngredientComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule {

}