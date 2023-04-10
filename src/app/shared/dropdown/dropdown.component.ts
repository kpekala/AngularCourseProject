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

  menuOpened = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.menuOpened = this.elRef.nativeElement.contains(event.target) ? !this.menuOpened : false;
  }

  
}
