import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipesService } from "./recipes/recipes.service";
import { SelectRecipeComponent } from "./recipes/select-recipe/select-recipe.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { recipesResolver } from "./recipes/recipes-resolver";

const appRoutes: Routes = [
    {path: '', redirectTo: 'shopping-list', pathMatch: 'full'},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'recipes', component: RecipesComponent, resolve: [recipesResolver], children: [
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [recipesResolver]},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [recipesResolver]},
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