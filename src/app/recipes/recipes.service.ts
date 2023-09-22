import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject, exhaustMap, map, take, tap} from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class RecipesService {

  recipesChanged = new Subject<Recipe[]>();

  recipesUrl = 'https://recipes-app-25ea1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

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
