import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RecipesService } from "./recipe.service";

export const recipeResolver: ResolveFn<any>
 =(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any => {
    const recipesService = inject(RecipesService);

    const id: number = +route.params['id'];
  console.log(recipesService.getRecipe(id));

    return recipesService.getRecipe(id);
 }
