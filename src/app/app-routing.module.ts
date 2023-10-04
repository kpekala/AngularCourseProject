import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesService } from "./recipes/recipes.service";

const appRoutes: Routes = [
    {path: '', redirectTo: 'shopping-list', pathMatch: 'full'},
    {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule)}
];

@NgModule({
    providers: [RecipesService],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}