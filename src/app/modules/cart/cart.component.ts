import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  userId!: number;
  userData: any;
  userCart: any

  constructor(
    private authService : AuthService
  ){}

  ngOnInit(): void {
    this.authService.currentUserId$.subscribe((res) => {
      this.userId = res;
    });
    this.authService.getUserDataById(this.userId).subscribe((res : any) => {
      this.userData = res;
      this.userCart = res.cart;
      console.log(this.userCart)
    })
  }

}
