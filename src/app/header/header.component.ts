import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {ViewState} from "../shared/enums";
import { RecipesService } from '../recipes/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  fetchRecipesSub: Subscription;

  constructor(private recipesService: RecipesService){

  }
  
  onSaveDataClick(){
    this.recipesService.storeRecipes();
  }

  onFetchDataClick(){
    this.fetchRecipesSub = this.recipesService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.fetchRecipesSub.unsubscribe();
  }
}
