import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-header-section',
  imports: [],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.css',
})
export class HeaderSectionComponent {
  @Input() firstWord!:string;
  @Input() scondWord!:string;
  
}
