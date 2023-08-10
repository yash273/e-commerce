import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CartService } from 'src/app/modules/cart/service/cart.service';

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
    private cartService: CartService
  ) {
  }

  goBack() {
    window.history.back();
  }

  ngOnInit(): void {
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
    this.authService.removeLoggedUser();
    console.log('Successfully Logged out')
    this.router.navigate(['/login']);
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }


}
