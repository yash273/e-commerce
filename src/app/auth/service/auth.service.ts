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
    console.log(this.getUserFromLocal())
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(environment.baseURL + `users`);
  }

  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromLocal());
  currentUserId$ = this.currentUserSubject.asObservable();

  saveUserToLocal(data: any) {
    const id = data.id;
    localStorage.setItem('loggedUserId', JSON.stringify(id));
    this.currentUserSubject.next(data.id);
  }

  getUserFromLocal() {
    return localStorage.getItem('loggedUserId')
  }

  removeLoggedUser() {
    this.currentUserSubject.next(null);
    return localStorage.removeItem('loggedUserId')
  }

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(environment.baseURL + `users`, data);
  }

  getUserDataById(userId: number) {
    return this.http.get(environment.baseURL + `users/${userId}`)
  }

}
