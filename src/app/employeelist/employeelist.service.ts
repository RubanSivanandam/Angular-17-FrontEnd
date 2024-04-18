import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8090/api/v1/employees'; 

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

  // Define the getEmployees method to fetch data from your backend
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8090/api/v1/employees/find',{ headers: this.createHeaders()}); // Adjust the URL to match your backend API endpoint
  }

  // Define the deleteEmployee method to delete an employee by ID
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`,{ headers: this.createHeaders()});
  }

  // Define the updateEmployee method to update an employee by ID
  updateEmployee(id: string, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, payload,{ headers: this.createHeaders()});
  }

  // Define the editEmployee method to retrieve an employee by ID
  editEmployee(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`,{ headers: this.createHeaders()});
  }
  saveUserData(userData: any) {
    return this.http.get<any>(`${this.apiUrl}/register`,userData);
}