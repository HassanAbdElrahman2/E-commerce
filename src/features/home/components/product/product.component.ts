import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderSectionComponent } from "../../../../shared/ui/header-section/header-section.component";
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  selector: 'app-product',
  imports: [HeaderSectionComponent,CardComponent],
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

}
