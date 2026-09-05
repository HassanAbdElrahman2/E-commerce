import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderSectionComponent } from "../../../../shared/ui/header-section/header-section.component";
import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.interface';

@Component({
  selector: 'app-category-home',
  imports: [HeaderSectionComponent],
  templateUrl: './category-home.component.html',
  styleUrl: './category-home.component.css',
})
export class CategoryHomeComponent implements OnInit {
  private readonly categoriesService=inject(CategoriesService);
  categoryList=signal<Category[]>([]);
  ngOnInit(): void {
    this.getAllCategories();
  }

getAllCategories():void{
this.categoriesService.getAllCategories().subscribe({
  next:(res)=>{
     this.categoryList.set(res.data);
  }
})
}
}
