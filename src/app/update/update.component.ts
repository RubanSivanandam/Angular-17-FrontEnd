import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from './update.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  userRecord: any = {};
  userInput: any = { id: '', username: '', designation: '', email: '', password: '' };
  isEditing: boolean = false;
  public employeeId: string | undefined;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log("params::: ", params)
      const id = params['id'];
      this.getUserRecord(id);
      //this.employeeId=params['employeeId'];
    });
  }

  getUserRecord(id: string) {
    this.employeeId = id;
    this.dataService.getEmployeeById(id).subscribe((employee: any) => {
      this.userRecord = employee;
      this.userInput.id = this.userRecord.id;
      this.userInput.username = this.userRecord.username;
      this.userInput.designation = this.userRecord.designation;
      this.userInput.email = this.userRecord.email;
      this.userInput.password = this.userRecord.password;
    });
  }

  saveUserData() {
    if (!this.employeeId) return;
    const payload = {
      id: this.userInput.id,
      username: this.userInput.username,
      designation: this.userInput.designation,
      email: this.userInput.email,
      password: this.userInput.password
      
    };
    
    this.dataService.updateuserData(this.employeeId, payload).subscribe((response) => {
      console.log('User data updated successfully:', response);
      this.router.navigate(['login/employees']);
      this.isEditing = false;
      
    }, (error) => {
      console.error('Error updating user data:', error);
    });
  }

  editEmployee() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }
  /*updateEmployeeData(payload:any){
    this.dataService.updateuserData(this.employeeId)
  }*/
}