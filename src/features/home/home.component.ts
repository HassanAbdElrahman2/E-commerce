import { Component } from '@angular/core';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { SliderComponent } from './components/slider/slider.component';
import { ProductComponent } from './components/product/product.component';


@Component({
  selector: 'app-home',
  imports: [CategoryHomeComponent,SliderComponent,ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
