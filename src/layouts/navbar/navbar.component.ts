import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{
    private readonly authService=inject(AuthService);
     private readonly cartService=inject(CartService);
       private readonly categoriesService=inject(CategoriesService);
  categoryList=signal<Category[]>([]);
    constructor(private flowbiteService: FlowbiteService) {}
    logged=computed(()=>this.authService.isLogged());
    private readonly id=inject(PLATFORM_ID)
    count=computed(()=>this.cartService.cartCount())
  ngOnInit(): void {
    if(isPlatformBrowser(this.id)){
      this.getCartCount();
      if(localStorage.getItem('freshToken')){
    this.authService.isLogged.set(true);
  }}
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  this.getCategories();
  }
  signOut():void{
  this.authService.signOut()
  }
  getCartCount():void{
    this.cartService.getLoggedUserCart().subscribe({next:(res)=>{
      this.cartService.cartCount.set(res.numOfCartItems);
    }})
  }
  getCategories():void{
    this.categoriesService.getAllCategories().subscribe({
  next:(res)=>{
     const randomCategories = [...res.data]
  .sort(() => Math.random() - 0.5)
  .slice(0, 4);

this.categoryList.set(randomCategories);
    
  }
});
  }
}
