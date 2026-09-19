import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  imports: [RouterLink],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css',
})
export class SubCategoryComponent implements OnInit{
   private readonly categoriesService=inject(CategoriesService);
   private route = inject(ActivatedRoute);
  subCategoryList=signal<Category[]>([]);
  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      this.getAllSubCategories(param.get('subcategory')!);
    });
   
  }

getAllSubCategories(categoryId:string):void{
this.categoriesService.getAllSubCategories(categoryId).subscribe({
  next:(res)=>{
     this.subCategoryList.set(res.data);
     console.log(res)
  }
})
}
}
