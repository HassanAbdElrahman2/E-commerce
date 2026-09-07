import { Component, inject, OnInit } from '@angular/core';

import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    this.getCartData();
  }
  private readonly cartService=inject(CartService);
  getCartData():void{
this.cartService.getLoggedUserCart().subscribe((res)=>{
console.log(res.data)
})
  }
}
