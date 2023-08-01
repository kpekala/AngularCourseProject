import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { recipeResolver } from "./recipes/recipe-resolver";
import { RecipesService } from "./recipes/recipe.service";
import { SelectRecipeComponent } from "./recipes/select-recipe/select-recipe.component";

const appRoutes: Routes = [
    {path: '', redirectTo: 'shopping-list', pathMatch: 'full'},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: ':id', component: RecipeDetailComponent, resolve : {recipe: recipeResolver}},
        {path: '', component: SelectRecipeComponent, pathMatch: 'full'}
        
    ]},
];

@NgModule({
    providers: [RecipesService],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}