import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/service/cart.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SharedService } from 'src/shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartDetails: any;
  totalCartAmount!: number;
  totalItems!: number;
  charges!: number;
  total!: number;
  userId!: number;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {

  }

  selectedItems: any[] = [];

  ngOnInit(): void {
    this.authService.currentUserId$.subscribe((res) => {
      this.userId = res;
    });
    const x = this.cartService.getCartDetailsFromLocal();
    if (x) {
      this.selectedItems = JSON.parse(x);
    }
    this.totalCartAmount = this.selectedItems.reduce((total, cartItem) => total + cartItem.totalAmount, 0);
    this.totalItems = this.selectedItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    this.charges = this.totalItems * 2;
    this.total = this.charges + this.totalCartAmount;
  }

  paymentMethods = [
    { label: 'Credit Card', value: 'credit-card' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Cash on Delivery', value: 'cash' }
  ];

  selectedPaymentMethod: string | undefined;
  creditCardNumber: number | undefined | string;
  paypalAccountEmail: string = '';
  cashPaymentComments: string = '';
  paymentMethodError: string = '';

  proceedToBuy(): void {
    this.paymentMethodError = '';
    if (!this.selectedPaymentMethod) {
      this.sharedService.showAlert("Please select a payment method!", "error");
      return;
    }
    if (this.selectedPaymentMethod === 'credit-card') {
      if (!this.creditCardNumber) {
        this.paymentMethodError = "Please enter a credit card number.";
        return;
      }
    }
    if (this.selectedPaymentMethod === 'paypal') {
      if (!this.paypalAccountEmail) {
        this.paymentMethodError = "Please enter valid PayPal Email.";
        return;
      }
    }

    if (this.selectedPaymentMethod === 'cash') {
      if (!this.cashPaymentComments) {
        this.paymentMethodError = "Please enter Comment or instructions.";
        return;
      }
    }

    this.buyItems()
  }

  buyItems() {
    const order = {
      orderNumber: `ORD${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString(),
      items: this.selectedItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      totalAmount: this.total,
      paymentMethod: this.selectedPaymentMethod,
    };
    this.authService.getUserDataById(this.userId).subscribe(
      (user: any) => {
        user.orders.push(order);
        this.authService.updateUser(this.userId, user).subscribe(
          (res) => {
            this.sharedService.showAlert("Order Placed Successfully!", "success");
            this.authService.clearCart(this.userId).subscribe();
            this.cartService.clearCart();
            this.router.navigate(['/my-orders'])
          }
        )
      });
  }



}
