import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ManageProductService } from '../manage-product/service/manage-product.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  userId !: number;
  orderHistory: any[] = [];

  constructor(
    private authService: AuthService,
    private manageProductService: ManageProductService
  ) {

  }

  ngOnInit(): void {
    this.authService.currentUserId$.subscribe((res) => {
      this.userId = res;
    });
    this.historyData();
  }

  historyData() {
    this.authService.getUserDataById(this.userId).subscribe((res: any) => {
      this.orderHistory = res.orders;
      this.orderHistory.forEach((order) => {
        order.items.forEach((item: any) => {
          this.manageProductService.getProductById(item.product_id).subscribe((product) => {
            item.product = product;
          });
        });
      });
      console.log(this.orderHistory)
    });
  }
}
