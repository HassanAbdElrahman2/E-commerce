import { Component, inject, OnInit, signal } from '@angular/core';

import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/models/cart.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
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
    this.getCartData();
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
  }
})
 }
 clearCart():void{
  this.cartService.clearUserCart().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.cartDetails.set(res.data);
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
