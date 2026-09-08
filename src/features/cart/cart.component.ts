import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/models/cart.interface';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly id=inject(PLATFORM_ID);
 private readonly emptyCart: Cart = {
  _id: '',
  cartOwner: '',
  products: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0,
  totalCartPrice: 0
};
  cartDetails= signal<Cart>(this.emptyCart);
  ngOnInit(): void {
    if(isPlatformBrowser(this.id)){
    this.getCartData();
  }
  }
  private readonly cartService=inject(CartService);
  getCartData():void{
this.cartService.getLoggedUserCart().subscribe((res)=>{
this.cartDetails.set(res.data);
})
  }
 removeProductFromCart(productId:string):void{
this.cartService.removeProduct(productId).subscribe({
  next:(res)=>{
  this.cartDetails.set(res.data);
  this.cartService.cartCount.set(res.numOfCartItems);
  }
})
 }
 clearCart():void{
  this.cartService.clearUserCart().subscribe({
    next:(res)=>{
      this.cartDetails.set(res.data);
      this.cartService.cartCount.set(res.numOfCartItems);
    }
  })
 }
 update(productId:string,count:number):void{
  this.cartService.updateCartProductQuantity(productId,count).subscribe({
    next:(res)=>{
this.cartDetails.set(res.data);
    }
  })
 }
}
