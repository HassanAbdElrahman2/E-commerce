import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from "../../shared/ui/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination'; 
@Component({
  selector: 'app-shop',
  imports: [CardComponent,NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  ProductList=signal<Product[]>([]);
  pageSize=signal<number>(0);
  currentPage=signal<number>(0);
  total=signal<number>(0);
  private readonly productsService =inject(ProductsService);
   ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(page:number=1):void{
    this.productsService.getAllProducts(page).subscribe({
      next:(res)=>{
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
    this.getAllProducts(page);
  }
}
