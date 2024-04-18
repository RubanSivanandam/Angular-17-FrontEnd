import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8090/api/v1/employees'; // Route to Node.js backend endpoint

  constructor(private http: HttpClient) { }

  // Function to create HTTP headers with JWT token
  createHeaders(): HttpHeaders {
    const token = localStorage.getItem('kyck_user');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData, { headers: this.createHeaders() });
  }

 
}
