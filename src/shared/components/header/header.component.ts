import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CartService } from 'src/app/modules/cart/service/cart.service';
import { SharedService } from 'src/shared/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUserId !: number;
  currentUser: any;
  cartItemCount!: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private sharedService: SharedService
  ) {
  }

  goBack() {
    window.history.back();
  }

  ngOnInit(): void {
    this.cartService.cart();
    this.authService.currentUserId$.subscribe((res) => {
      this.currentUserId = res;
      this.authService.getUserDataById(res).subscribe((result) => {
        this.currentUser = result
      })
    });
    this.cartService.cart$.subscribe((res) => {
      this.cartItemCount = res.length;
    })

  }
  logOut() {

    const dialogRef = this.sharedService.openDeleteDialog("Do You Really Want To Log Out?", "Attention!");

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.removeLoggedUser();
        this.sharedService.showAlert('Successfully Logged out', "success")
        this.router.navigate(['/login']);
      }
    })

  }
  goToCart() {
    this.router.navigate(['/cart']);
  }


}
