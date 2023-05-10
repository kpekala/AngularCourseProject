import {Component, Input, ElementRef, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() menuList;
  @Input() dropdownStyle: string = 'default';
  @Input() dropdownTitle: string = 'Dropdown';
  @Input() alignToRight = false;

  @Output() onClickEvent = new EventEmitter<string>();

  constructor(private elRef: ElementRef) {}

  onClick(itemName: string){
    this.onClickEvent.emit(itemName);
  }


}
