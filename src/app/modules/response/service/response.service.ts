import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(
    private http: HttpClient
  ) { }

  getAllocationsList() {
    return this.http.get(environment.baseURL + `AllocationsList`)
  }
}
