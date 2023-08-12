import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/service/cart.service';

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

  constructor(
    private cartService: CartService
  ) {

  }

  selectedItems: any[] = [];

  ngOnInit(): void {
    this.selectedItems = history.state.selectedItems || [];
    this.totalCartAmount = this.selectedItems.reduce((total, cartItem) => total + cartItem.totalAmount, 0);
    this.totalItems = this.selectedItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    this.charges = this.totalItems * 2;
    this.total = this.charges + this.totalCartAmount;
  }

}
