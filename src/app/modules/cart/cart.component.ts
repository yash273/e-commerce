import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ManageProductService } from '../manage-product/service/manage-product.service';
import { CartService } from './service/cart.service';
import { DeleteComponent } from 'src/shared/components/delete/delete.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/shared/services/shared.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  userId!: number;
  userData: any;
  userCart: any;
  cartItemsWithDetails: { product_id: number; product: any; quantity: number; totalAmount: number }[] = [];
  totalItems!: number;
  totalCartAmount!: number;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    private productService: ManageProductService,
    private cartService: CartService,
    private sharedService: SharedService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher

  ) {

    this.mobileQuery = media.matchMedia('(max-width: 1280px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }



  ngOnInit(): void {
    this.authService.currentUserId$.subscribe((res) => {
      this.userId = res;
    });
    this.cartData();
  }

  cartData() {
    this.authService.getUserDataById(this.userId).subscribe((res: any) => {
      this.userData = res;
      this.userCart = res.cart;
      this.cartItems(res.cart);
    })
  }

  cartSummaryDetails() {
    this.totalCartAmount = this.cartItemsWithDetails.reduce((total, cartItem) => total + cartItem.totalAmount, 0);
    this.totalItems = this.cartItemsWithDetails.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }

  cartItems(cart: any) {
    for (const cartItem of cart) {
      this.productService.getProductById(cartItem.product_id).subscribe(
        (product: any) => {
          this.cartItemsWithDetails.push({
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            product: product,
            totalAmount: product.price * cartItem.quantity
          });
          this.cartSummaryDetails();
        },
      )
    }
  }

  removeFromCart(productId: number) {

    const dialogRef = this.sharedService.openDeleteDialog("Do You Really Want To Delete The Item?", "Delete Item From Cart!");

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItemFunction(productId);
      }
    })
  }

  removeWhenLessThanOne(productId: number) {
    const dialogRef = this.sharedService.openDeleteDialog("Do You Really Want To Delete The Item?", "Further Quantity Decreasing will lead to depletion of the Item from cart!");

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItemFunction(productId);
      }
    })
  }

  viewProduct(productId: number) {
    this.router.navigate([`products/item/${productId}`])
  }

  deleteItemFunction(productId: number) {
    this.authService.currentUserId$.subscribe((res) => {
      this.userId = res;
    });

    this.authService.getUserDataById(this.userId).subscribe(
      (user: any) => {
        const updatedCart = user.cart.filter((item: any) => item.product_id !== productId);
        user.cart = updatedCart;

        this.authService.updateUser(this.userId, user).subscribe(
          (res) => {
            this.sharedService.showAlert("Product removed from cart", "success");
            this.cartService.cartSubject.next([...updatedCart]);

            this.cartItemsWithDetails = this.cartItemsWithDetails.filter(
              (item) => item.product_id !== productId
            );

            this.cartSummaryDetails();
          },
          (error) => {
            this.sharedService.showAlert("Error removing product from cart", "error");
            console.error(error);
          }
        );
      },
      (error) => {
        this.sharedService.showAlert("Error getting user data", "error");
        console.error(error);
      }
    );

  }

  changeQuantity(productId: number, action: 'increase' | 'decrease') {

    this.authService.currentUserId$.subscribe((res) => {
      this.userId = res;
    });

    this.authService.getUserDataById(this.userId).subscribe(
      (user: any) => {
        const cartItem = user.cart.find((item: any) => item.product_id === productId);

        if (cartItem) {
          if (action === 'increase') {
            cartItem.quantity++;
          } else if (action === 'decrease' && cartItem.quantity > 1) {
            cartItem.quantity--;
          } else {
            this.removeWhenLessThanOne(productId);
          }

          this.authService.updateUser(this.userId, user).subscribe(
            (res) => {
              this.cartService.cartSubject.next([...user.cart]);

              const cartItemWithDetails = this.cartItemsWithDetails.find(
                (item) => item.product_id === productId
              );
              if (cartItemWithDetails) {
                cartItemWithDetails.quantity = cartItem.quantity;
                cartItemWithDetails.totalAmount = cartItemWithDetails.product.price * cartItemWithDetails.quantity;
              }
              this.cartSummaryDetails();

            },
            (error) => {
              this.sharedService.showAlert("Error changing quantity in cart", "error");
              console.error(error);
            }
          );
        }
      },
      (error) => {
        this.sharedService.showAlert("Error getting user data", "error");
        console.error(error);
      }
    );
  }

  proceedToBuy() {
    this.cartService.setCartWithDetails(this.cartItemsWithDetails);
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    this.cartService.setCartWithDetails(this.cartItemsWithDetails);
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
