import { Routes } from '@angular/router';
import { authGuard } from '../core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/home/home.component')
        .then(m => m.HomeComponent),
    title: 'Home Page'
  },

  {
    path: 'brands',
    loadComponent: () =>
      import('../features/brands/brands.component')
        .then(m => m.BrandsComponent),
    title: 'Brands Page'
  },

  {
    path: 'shop',
    loadComponent: () =>
      import('../features/shop/shop.component')
        .then(m => m.ShopComponent),
    title: 'Shop Page',
    canActivate:[authGuard]
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('../features/categories/categories.component')
        .then(m => m.CategoriesComponent),
    title: 'Categories Page'
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('../features/cart/cart.component')
        .then(m => m.CartComponent),
    title: 'Cart Page',
    canActivate:[authGuard]
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('../features/wishlist/wishlist.component')
        .then(m => m.WishlistComponent),
    title: 'Wishlist Page',
    canActivate:[authGuard]
  },

  {
    path: 'details/:id/:slug',
    loadComponent: () =>
      import('../features/details/details.component')
        .then(m => m.DetailsComponent),
    title: 'Details Page'
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('../features/checkout/checkout.component')
        .then(m => m.CheckoutComponent),
    title: 'Checkout Page',
    canActivate:[authGuard]
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('../features/orders/orders.component')
        .then(m => m.OrdersComponent),
    title: 'Orders Page',
    canActivate:[authGuard]
  },

  {
    path: 'login',
    loadComponent: () =>
      import('../features/login/login.component')
        .then(m => m.LoginComponent),
    title: 'Login Page'
  },

  {
    path: 'register',
    loadComponent: () =>
      import('../features/register/register.component')
        .then(m => m.RegisterComponent),
    title: 'Register Page'
  },

  {
    path: 'forgot',
    loadComponent: () =>
      import('../features/forgot/forgot.component')
        .then(m => m.ForgotComponent),
    title: 'Forget Password Page'
  },

  {
    path: '**',
    loadComponent: () =>
      import('../features/notfound/notfound.component')
        .then(m => m.NotfoundComponent),
    title: 'Not Found Page'
  }
];