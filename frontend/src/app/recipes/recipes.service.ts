import {Recipe} from "./recipe.model";
import {Subject, map, tap} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipesService {

  recipesChanged = new Subject<Recipe[]>();

  recipesUrl = 'http://localhost:8080/api/recipes';

  private localRecipes: Recipe[] = [];


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getRecipes() {
    return this.localRecipes.slice();
  }

  getRecipe(id: number){
    return this.localRecipes[id];
  }

  addRecipe(recipe: Recipe){
    this.localRecipes.push(recipe);
    this.updateListeners();
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.localRecipes[index] = newRecipe;
    this.updateListeners();
  }

  private updateListeners() {
    this.recipesChanged.next(this.localRecipes.slice());
  }

  deleteRecipe(index: number){
    this.localRecipes.splice(index, 1);
    this.updateListeners();
  }

  storeRecipes() {
    this.http.put(this.recipesUrl, this.localRecipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>(this.recipesUrl)
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        })
    }),tap((recipes) => {
      this.localRecipes = recipes;
      this.updateListeners();
    }));
  }
}
