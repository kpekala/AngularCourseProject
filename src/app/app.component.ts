import { Component } from '@angular/core';
import {ViewState} from "./shared/enums";
import {RecipesService} from "./recipes/recipes.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-course-project';
}
