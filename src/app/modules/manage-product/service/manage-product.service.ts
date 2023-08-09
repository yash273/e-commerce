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
}
