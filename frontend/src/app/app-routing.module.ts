import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RecipesService } from "./recipes/recipes.service";

const appRoutes: Routes = [
    {path: '', redirectTo: 'shopping-list', pathMatch: 'full'},
    {
        path: 'shopping-list', 
        loadChildren: () => import('./shopping-list/shopping-list.module').then(x => x.ShoppingListModule)
    },
    {
        path: 'recipes', 
        loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule)
    },{
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
    }
];

@NgModule({
    providers: [RecipesService],
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}