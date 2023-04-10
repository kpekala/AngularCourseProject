import { Component, Input, HostListener, ElementRef} from '@angular/core';

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

  constructor(private elRef: ElementRef) {}

  
}
