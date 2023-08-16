import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SharedService } from 'src/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) { }

  userOrders: any;

  orderData() {
    this.authService.currentUserId$
      .pipe(
        switchMap(userId => this.authService.getUserDataById(userId))
      ).subscribe((userData: any) => {
        this.userOrders = userData.orders || [];
        console.log(this.userOrders);
      });
  }

}
