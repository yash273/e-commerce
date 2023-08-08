import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProductByCategory(category: string) {
    return this.http.get(environment.baseURL + `products?category=${category}`)
  }

  getProductDataById(productId: number) {
    return this.http.get(environment.baseURL + `products/${productId}`)
  }
}
