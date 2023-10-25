import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
        SelectRecipeComponent,
        RecipeEditComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule {}