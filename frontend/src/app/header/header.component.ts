import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ViewState} from "../shared/enums";
import { RecipesService } from '../recipes/recipes.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit{

  private userSub: Subscription;
  fetchRecipesSub: Subscription;
  isAuthenticated = false;

  constructor(private recipesService: RecipesService, private authService: AuthService){

  }
  
  onSaveDataClick(){
    this.recipesService.storeRecipes();
  }

  onFetchDataClick(){
    this.fetchRecipesSub = this.recipesService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.fetchRecipesSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
    });
  }
}
