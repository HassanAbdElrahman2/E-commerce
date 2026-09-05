import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
private readonly activatedRoute=inject(ActivatedRoute);
private readonly productsService=inject(ProductsService);
productId:string='';
SpecificProduct=signal<Product>({}as Product);
ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((prams)=>{
  this.productId =prams.get('id')!;
  this.getSpecificProduct();
  })
}
getSpecificProduct():void{
this.productsService.getSpecificProduct(this.productId).subscribe({
  next:(res)=>{
    this.SpecificProduct.set(res.data);
  },
  error:(err)=>{}
})
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
