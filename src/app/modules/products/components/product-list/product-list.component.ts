import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { MediaMatcher } from '@angular/cdk/layout';

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

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher

  ) {

    this.mobileQuery = media.matchMedia('(max-width: 1100px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.productService.getProductByCategory(this.category).subscribe((res) => {
        this.products = res;
      })
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  viewProduct(productId: number) {
    this.router.navigate([`products/item/${productId}`])
  }

}
