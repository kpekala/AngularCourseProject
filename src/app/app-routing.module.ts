import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesService } from "./recipes/recipes.service";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
    {path: '', redirectTo: 'shopping-list', pathMatch: 'full'},
    {path: 'auth', component: AuthComponent}
];

@NgModule({
    providers: [RecipesService],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}