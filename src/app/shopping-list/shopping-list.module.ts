import { NgModule } from "@angular/core";
import { IngredientComponent } from "./ingredient/ingredient.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
        IngredientComponent,
    ],
    imports: [
        FormsModule,
        ShoppingListRoutingModule,
        SharedModule
    ]
})
export class ShoppingListModule {

}