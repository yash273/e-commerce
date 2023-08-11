import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartSubject = new BehaviorSubject<any[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
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
    const cart = this.cartSubject.value;

    this.authService.currentUserId$.subscribe((res) => {
      this.userId = res;

      this.authService.getUserDataById(this.userId).subscribe(
        (user: any) => {
          const existingCartItem = user.cart?.find((item: any) => item.product_id === productId);

          if (existingCartItem) {
            existingCartItem.quantity++;
            console.log('Product is already in the cart.');
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
              console.log('Product added to cart');
              this.cartSubject.next([...user.cart]);
            },
            (error) => {
              console.error('Error adding product to cart:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    });
  }



  userData: any;
  userCart: any;







}

