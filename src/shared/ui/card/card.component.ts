import { Component, inject, input } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
    private readonly cartService =inject(CartService);
   private readonly toastrService =inject(ToastrService);
  product=input.required<Product>();

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
addProductToCart(prodId:string):void{
  if(localStorage.getItem('freshToken')){
      this.cartService.addProductToCart(prodId).subscribe((res)=>{
this.toastrService.success(res.message,'Fresh Cart',{
  closeButton:true,
  progressBar:true
})
this.cartService.cartCount.set(res.numOfCartItems);
  });
  
  }else{
    this.toastrService.warning('please login first','Fresh Cart',{
  closeButton:true,
  progressBar:true
})
  ;
  }

}
}
