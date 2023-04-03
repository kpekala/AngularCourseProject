import { Component } from '@angular/core';
import {ViewState} from "./shared/enums";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-course-project';
  currentView: ViewState = ViewState.RECIPES;

  public get CurrentView() {
    return ViewState
  }

  onSelectView(newViewState: ViewState) {
    this.currentView = newViewState;
  }
}
