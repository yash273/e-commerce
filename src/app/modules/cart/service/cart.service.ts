import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SharedService } from 'src/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartSubject = new BehaviorSubject<any[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.cart();
  }

  cart() {
    this.authService.currentUserId$
      .pipe(
        switchMap(userId => this.authService.getUserDataById(userId))
      ).subscribe((userData: any) => {
        const userCart = userData.cart || [];
        this.cartSubject.next(userCart);
      });
  }

  userId !: number;

  addToCart(productId: number) {

    this.authService.currentUserId$.subscribe((res) => {
      this.userId = res;

      this.authService.getUserDataById(this.userId).subscribe(
        (user: any) => {
          const existingCartItem = user.cart?.find((item: any) => item.product_id === productId);

          if (existingCartItem) {
            existingCartItem.quantity++;
          } else {
            user.cart.push(
              {
                product_id: productId,
                quantity: 1
              }
            );
          }
          this.authService.updateUser(this.userId, user).subscribe(
            (res) => {
              this.sharedService.showAlert("Product added to cart.", 'success')
              this.cartSubject.next([...user.cart]);
            },
            (error) => {
              this.sharedService.showAlert("Error adding product to cart.", 'success')
              console.error(error);
            }
          );
        },
        (error) => {
          this.sharedService.showAlert("Error fetching user data.", 'success')
          console.error(error);
        }
      );
    });
  }

}

