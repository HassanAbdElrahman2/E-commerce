import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient=inject(HttpClient);


   getAllProducts(pageNum:number=1,prams?:{
    category?:string,
    subcategory?:string,
    brand?:string
  }):Observable<any>{
    let httpPrams=new HttpParams();
    
    if(prams?.category!=null){
      httpPrams = httpPrams.set('category', prams.category);
    }else if(prams?.subcategory!=null){
      console.log(prams?.subcategory)
      httpPrams = httpPrams.set('subcategory', prams.subcategory);
    }else if(prams?.brand!=null){
httpPrams = httpPrams.set('brand', prams.brand);
    }
    
    return this.httpClient.get(environment.baseUrl+`/api/v1/products?page=${pageNum}`,{params:httpPrams});
  }
  getSpecificProduct(productId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v1/products/${productId}`);
  }
}
