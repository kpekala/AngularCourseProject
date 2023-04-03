import {Component, EventEmitter, Output} from '@angular/core';
import {ViewState} from "../shared/enums";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() onSelectView = new EventEmitter<ViewState>();

  onShoppingListClicked() {
    this.onSelectView.emit(ViewState.SHOPPING_LIST);
  }

  onRecipesClicked() {
    this.onSelectView.emit(ViewState.RECIPES);
  }
}
