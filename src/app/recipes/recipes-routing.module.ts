import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { recipesResolver } from "./recipes-resolver";
import { RecipesComponent } from "./recipes.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'recipes', 
        component: RecipesComponent, 
        canActivate: [authGuard],
        resolve: [recipesResolver], 
        children: [
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent, resolve: [recipesResolver]},
            {path: ':id/edit', component: RecipeEditComponent, resolve: [recipesResolver]},
            {path: '', component: SelectRecipeComponent, pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}