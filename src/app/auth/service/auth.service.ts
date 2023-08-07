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
}
