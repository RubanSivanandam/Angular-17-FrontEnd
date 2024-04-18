import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



interface ErrorResponse {
  message?:string;
  error?:string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;
  /* showAlert:boolean=false; */
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
    this.register = this.formBuilder.group({ 
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)]],
      username:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      designation:['',[Validators.required]],
      password: ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
    });
  }
  onSubmit(): void {
    console.log(this.register.valid);
    
    if (this.register.valid) {
      this.dataService.saveUserData(this.register.value).subscribe({
        next: (response:any ) => { // Specify the type of 'response'
          this.toastr.success(response.message || 'Success', 'Success');
          this.router.navigate(['/login']);     // Navigate to the desired route after successful form submission
        },
        error: (error: HttpErrorResponse) => {
          const errorResponse = error.error as ErrorResponse;
          this.toastr.error(errorResponse.message || 'An error occurred', 'Error');
        }
      });
    } else {
      this.markFormGroupTouched(this.register);
      console.log('Password validation errors:', this.register.get('password')?.value); 

    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  togglePasswordVisibility(inputId: string): void {
    const passwordInput = document.getElementById(inputId) as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
 
  dummy(a:any){
    return JSON.stringify(a)
  }

}
  

