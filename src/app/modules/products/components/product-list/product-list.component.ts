import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  category: any;
  products: any;
  productImages: any
  selectedImage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.productService.getProductByCategory(this.category).subscribe((res) => {
        this.products = res;
      })
    });
  }

  viewProduct(productId: number) {
    this.router.navigate([`products/item/${productId}`])
  }

}
