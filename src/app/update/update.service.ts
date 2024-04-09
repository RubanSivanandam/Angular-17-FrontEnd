import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8090/api/v1/employees/update'; // Route to Node.js backend endpoint

  constructor(private http: HttpClient) { }

    // Define the updateEmployee method to update an employee by ID
    getEmployeeById(employeeId: string): Observable<any> {
      const url = 'http://localhost:8090/api/v1/employees/find/'+employeeId;
      return this.http.get<any>(url);
    }

  // Method to fetch user record by ID from the server
  getUserRecordById(employeeId: string): Observable<any> {
    // Assuming your API endpoint to fetch user record by ID is '/api/v1/employees/find/:id'
    // Adjust the URL accordingly based on your API endpoint
    const url = 'http://localhost:8090/api/v1/employees/find/'+ employeeId;
    return this.http.get<any>(url);
  }

  updateuserData(employeeId: string, payload: any): Observable<any> {
    // API endpoint to update user data is '/api/v1/employees/update/:id'
    //  URL based on my API endpoint
    const url = 'http://localhost:8090/api/v1/employees/update/'+ employeeId;
    return this.http.put<any>(url, payload);
  }

}