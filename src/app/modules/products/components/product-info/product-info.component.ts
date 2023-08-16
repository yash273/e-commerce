import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CartService } from 'src/app/modules/cart/service/cart.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ManageProductService } from 'src/app/modules/manage-product/service/manage-product.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  productId!: number;
  item: any;
  productImages: any
  selectedImage: string = '';

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private route: ActivatedRoute,
    private productService: ManageProductService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 1100px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe((res) => {
      this.item = res;
      this.productImages = this.item.images;
      this.selectedImage = this.productImages[0].url;
    })
  }

  showFullImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  userId !: number;
  addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }

  buyNow(productId: number) {
    this.cartService.addToCart(productId);
    this.router.navigate(['/cart']);
  }
}
