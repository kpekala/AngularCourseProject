import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RecipesService } from "./recipes.service";

export const recipesResolver: ResolveFn<any> = 
   (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any => {
    const recipesService = inject(RecipesService);

    const localRecipes = recipesService.getRecipes();
    if(localRecipes.length === 0){
      return recipesService.fetchRecipes();
    }else {
      return localRecipes;
    }
    
 }