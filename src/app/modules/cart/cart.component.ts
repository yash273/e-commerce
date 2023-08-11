import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ManageProductService } from '../manage-product/service/manage-product.service';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  userId!: number;
  userData: any;
  userCart: any;
  cartItemsWithDetails: { product_id: number; product: any; quantity: number; totalAmount: number }[] = [];
  totalItems!: number;
  totalCartAmount!: number;

  constructor(
    private authService: AuthService,
    private productService: ManageProductService,
    private cartService: CartService
  ) { }

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

    console.log(this.cartItemsWithDetails)
  }

  removeFromCart(productId: number) {

    this.authService.currentUserId$.subscribe((res) => {
      this.userId = res;
    });

    this.authService.getUserDataById(this.userId).subscribe(
      (user: any) => {
        const updatedCart = user.cart.filter((item: any) => item.product_id !== productId);
        user.cart = updatedCart;

        this.authService.updateUser(this.userId, user).subscribe(
          (res) => {
            console.log('Product removed from cart');
            this.cartService.cartSubject.next([...updatedCart]);

            this.cartItemsWithDetails = this.cartItemsWithDetails.filter(
              (item) => item.product_id !== productId
            );

            this.cartSummaryDetails();
          },
          (error) => {
            console.error('Error removing product from cart:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting user data:', error);
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
            this.removeFromCart(productId);
          }

          this.authService.updateUser(this.userId, user).subscribe(
            (res) => {
              console.log('Quantity changed in cart');
              // After successful update, update the cartSubject with the new cart data
              this.cartService.cartSubject.next([...user.cart]);

              // Update the quantity in cartItemsWithDetails
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
              console.error('Error changing quantity in cart:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error getting user data:', error);
      }
    );
  }

  proceedToBuy() {
    console.log(this.cartItemsWithDetails)
  }


}
