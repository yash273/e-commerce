import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  products: any;
  route = 'home'
  groupedProducts: { [category: string]: any[] } = {};

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.homeService.getAllProducts().subscribe((res) => {
      this.products = res;

      this.groupedProducts = this.groupProductsByCategory(this.products);

    })
  }

  groupProductsByCategory(products: any, maxProducts = 5) {
    const groupedProducts: any = {};
    products.forEach((product: any) => {
      if (!groupedProducts[product.category]) {
        groupedProducts[product.category] = [];
      }

      if (groupedProducts[product.category].length < maxProducts) {
        groupedProducts[product.category].push(product);
      }
    });
    return groupedProducts;
  }

  getCategories() {
    return Object.keys(this.groupedProducts);
  }

  viewMore(category: any) {
    console.log(category);
    this.router.navigate(['products'], { queryParams: { category: `${category}` } })
  }

  viewProduct(productId: number) {
    this.router.navigate([`products/item/${productId}`])
  }

}
