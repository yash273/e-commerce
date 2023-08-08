import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(environment.baseURL + `users`);
  }

  saveUserToLocal(data: any) {
    const id = data.id
    localStorage.setItem('loggedUserId', JSON.stringify(id));
  }

  getUserFromLocal() {
    return localStorage.getItem('loggedUserId');
  }

  removeLoggedUser() {
    return localStorage.removeItem('loggedUserId')
  }

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(environment.baseURL + `users`, data);
  }
}
