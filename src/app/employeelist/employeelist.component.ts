import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './employeelist.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';


interface ErrorResponse {
  message?:string;
  error?:string;
}
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})


export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  isEditing = false;
  editedUsername = '';
  editedEmail = '';
  editedDesignation = '';
  
  constructor(private router: Router, private dataService: DataService ,private toastr: ToastrService) { }

  ngOnInit(): void {
    // Check if the token is already stored in local storage
    const token = localStorage.getItem('kyck_user');
    if (!token) {
      // If token is not present, navigate to login
      this.router.navigate(['/login']);
    } else {
      // If token is present, fetch employees
      this.fetchEmployees();
    }
  }

  fetchEmployees() {
    this.dataService.getEmployees().subscribe((data: any[]) => {
      this.employees = data;
      console.log(data);
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.dataService.deleteEmployee(id).subscribe({
        next: (response: any) => {
          // Success response
          this.toastr.success(response.message || 'Employee Deleted Successfully', 'Success');
          this.employees = this.employees.filter(employee => employee.id !== id);
          this.router.navigate(['/table']);
        },
        error: (error: HttpErrorResponse) => {
          const errorResponse = error.error as ErrorResponse;
          this.toastr.error(errorResponse.message || 'An error occurred', 'Error');
        }
      });
    }
  }

  editEmployee(employee: any) {
    // Set isEditing to true
    this.isEditing = true;
    // Set the original values for editing
    this.editedUsername = employee.username;
    this.editedEmail = employee.email;
    this.editedDesignation = employee.designation;
  }
  

  saveUserData(employee: any) {
    const id = employee.id;
    this.dataService.saveUserData(id, employee).subscribe({
      next: (response: any) => {
        // Success response
        this.toastr.success(response.message || 'Data saved successfully', 'Success');
        this.isEditing = false; // Exit edit mode after saving
      },
      error: (error: HttpErrorResponse) => {
        const errorResponse = error.error as ErrorResponse;
        this.toastr.error(errorResponse.message || 'An error occurred', 'Error');
      }
    });
  }
  
  Logout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }

  addEmployee() {
    this.router.navigate(['/register']);
  }
}
