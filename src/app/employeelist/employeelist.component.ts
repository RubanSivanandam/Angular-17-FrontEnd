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

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.dataService.getEmployees().subscribe((data: any[]) => {
      this.employees = data;
      console.log(data)
    });
  }

  editEmployee(id : number) {
    this.router.navigate(['login/employees/update/'+id]);
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.dataService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter(employee => employee.id !== id);
        this.router.navigate(['login/employees'])
      });
    }
  }
  goBack(){
    this.router.navigate(['/register']);
  }
  addEmployee(){
    this.router.navigate(['/register']);

  }
}