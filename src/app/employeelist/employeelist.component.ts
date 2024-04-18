import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './employeelist.service';

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
  
  constructor(private router: Router, private dataService: DataService) { }

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
      this.dataService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter(employee => employee.id !== id);
        this.router.navigate(['/table']);
      });
    }
  }

  editEmployee(employee: any) {
    
    this.isEditing = true;
    // Store the original values in variables for editing
    this.editedUsername = employee.username;
    this.editedEmail = employee.email;
    this.editedDesignation = employee.designation;

  }
  saveUserData(employee: any) {
    // Save the edited values to the employee object
    employee.username = this.editedUsername;
    employee.email = this.editedEmail;
    employee.designation = this.editedDesignation;
    // Call your service method to save the data
    this.dataService.saveUserData(employee).subscribe({
      next: (response: any) => {
        console.log('Data saved successfully:', response);
        this.isEditing = false; // Exit edit mode after saving
      },
      error: (error: any) => {
        console.error('Error saving data:', error);
      }
    });
  }

  goBack(){
    this.router.navigate(['/login']);
  }

  addEmployee(){
    this.router.navigate(['/register']);
  }
}
