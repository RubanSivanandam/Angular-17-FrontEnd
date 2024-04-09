import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8090/api/v1/employees/create'; // Route to Node.js backend endpoint

  constructor(private http: HttpClient) { }

  saveUserData(userData: any) {
    return this.http.post(this.apiUrl, userData)
  }
}
