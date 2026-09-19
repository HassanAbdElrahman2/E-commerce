import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Brand, Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from "../../shared/ui/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.interface';
@Component({
  selector: 'app-shop',
  imports: [CardComponent,NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit  {
 
  ProductList=signal<Product[]>([]);
  categoryData=signal<Category|undefined>(undefined);
  brandData=signal<Brand|undefined>(undefined);
  pageSize=signal<number>(0);
  currentPage=signal<number>(0);
  total=signal<number>(0);
  category = signal<string | undefined>(undefined);
  subcategory = signal<string | undefined>(undefined);
  brand=signal<string | undefined>(undefined);
  private readonly productsService =inject(ProductsService);
  private readonly categoriesService =inject(CategoriesService);
  private route = inject(ActivatedRoute);
 ngOnInit(): void {

  this.route.queryParamMap.subscribe(param => {

    // Clear old category data
    this.categoryData.set(undefined);
    this.brandData.set(undefined);

    // Set filters
    this.category.set(param.get('category') ?? undefined);
    this.subcategory.set(param.get('subcategory') ?? undefined);
    this.brand.set(param.get('brand') ?? undefined);

    // Get  details
    if (this.category()) {
      this.getCategory(this.category()!);
    }else if(this.brand()){
      this.getBrand(this.brand()!)
    }

    // Get products
    this.getAllProducts(1, {
      category: this.category(),
      subcategory: this.subcategory(),
      brand: this.brand()
    });

  });
}
  getAllProducts(page:number=1,prams?:{category?:string,subcategory?:string,brand?:string}):void{
   
    this.productsService.getAllProducts(page,prams).subscribe({
      next:(res)=>{
        console.log(res)
        this.ProductList.set(res.data);
        this.pageSize.set( res.metadata.limit);
        this.currentPage.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
      error:(err)=>{

      }
    })
  }
  pageChanged(page:number){
    this.getAllProducts(page,{
    category: this.category(),
    subcategory:this.subcategory(),
     brand:this.brand()
  });
  }
  getCategory(categoryId:string):void{
  this.categoriesService.getSpecificCategory(categoryId).subscribe({
    next :(res)=>{
      console.log(res)
      this.categoryData.set(res.data);
    }
  })
  }
   getBrand(brandId:string):void{
  this.categoriesService.getSpecificBrand(brandId).subscribe({
    next :(res)=>{
      this.brandData.set(res.data);
    }
  })
  }
}
