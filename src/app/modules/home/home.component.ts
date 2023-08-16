import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  products: any;
  route = 'home'
  groupedProducts: { [category: string]: any[] } = {};

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private homeService: HomeService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher

  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
