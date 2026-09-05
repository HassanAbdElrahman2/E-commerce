import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderSectionComponent } from "../../../../shared/ui/header-section/header-section.component";
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product',
  imports: [HeaderSectionComponent, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
ProductList=signal<Product[]>([]);
  private readonly productsService =inject(ProductsService);
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.ProductList.set(res.data)
      },
      error:(err)=>{

      }
    })
  }
truncateProductName(name: string): string {
  const words = name.split(' ');
   
  if (words.length <= 6) {
    return name;
   
  }

  return words.slice(0, 6).join(' ') + '...';
}
getStarType(rating: number, star: number): 'full' | 'half' | 'empty' {
  if (rating >= star) {
    return 'full';
  }

  if (rating >= star - 0.5) {
    return 'half';
  }

  return 'empty';
}
}
