import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient=inject(HttpClient);
  cartCount= signal<number>(0);
  addProductToCart(proId:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'/api/v2/cart',{
  "productId": proId
})
  }
  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(environment.baseUrl+'/api/v2/cart');
  }
  removeProduct(productId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v2/cart/${productId}`);
  }
  clearUserCart():Observable<any>{
    return this.httpClient.delete(environment.baseUrl+'/api/v2/cart');
  }
  
    updateCartProductQuantity(productId:string,count:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/api/v2/cart/${productId}`,{
      "count": count
    });
  }
  createCashOrder(cartId:string,data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/api/v1/orders/${cartId}`,data)
  }
    createVisaOrder(cartId:string,data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`,data)
  }
}

