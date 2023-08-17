import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ManageProductService } from '../manage-product/service/manage-product.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { SharedService } from 'src/shared/services/shared.service';
import { OrderHistoryService } from './service/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  userId !: number;
  orderHistory: any[] = [];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private orderHistoryService: OrderHistoryService,
    private manageProductService: ManageProductService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher

  ) {

    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
    });
  }

  viewOrder(order: any) {
    this.sharedService.openViewOrders(order);
  }
}
