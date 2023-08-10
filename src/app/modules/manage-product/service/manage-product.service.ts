import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProductList(page: number, limit: number) {
    return this.http.get
      (environment.baseURL +
        `products?_page=${page}&_limit=${limit}`
      )
  }

  saveProduct(data: any) {
    return this.http.post(environment.baseURL + `products`, data);
  }

  getProductById(productId: number) {
    return this.http.get(environment.baseURL + `products/${productId}`);
  }

  updateProduct(data: any, productId: number) {
    return this.http.put(environment.baseURL + `products/${productId}`, data);
  }
}
