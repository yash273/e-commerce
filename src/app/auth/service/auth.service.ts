import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(environment.baseURL + `users`);
  }

  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromLocal());
  currentUserId$ = this.currentUserSubject.asObservable();

  saveUserToLocal(data: any) {
    if (data.role === 1) {
      localStorage.setItem('token', 'admin');
    }
    if (data.role === 2) {
      localStorage.setItem('token', 'user');
    }
    const id = data.id;
    localStorage.setItem('loggedUserId', JSON.stringify(id));
    this.currentUserSubject.next(data.id);
  }

  getUserFromLocal() {
    return localStorage.getItem('loggedUserId')
  }

  removeLoggedUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    return localStorage.removeItem('loggedUserId');
  }

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(environment.baseURL + `users`, data);
  }

  getUserDataById(userId: number) {
    return this.http.get(environment.baseURL + `users/${userId}`)
  }

  updateUser(userId: number, data: any) {
    return this.http.put(environment.baseURL + `users/${userId}`, data);
  }

  addOrderToUser(userId: number, order: any): Observable<any> {
    return this.http.post(environment.baseURL + `users/${userId}/orders`, order);
  }

  clearCart(userId: number): Observable<any> {
    const clearCartData = {
      cart: [] // Empty cart array
    };

    return this.http.patch(environment.baseURL + `users/${userId}`, clearCartData);
  }

}
