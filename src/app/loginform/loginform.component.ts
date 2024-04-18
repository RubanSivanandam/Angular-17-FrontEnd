import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './loginform.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';



interface ErrorResponse {
  message?: string;
  error?: string;
}

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss'],
})
export class LoginformComponent implements OnInit {
  loginform!: FormGroup;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)]],
      password: ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
    });
  }

  onSubmit(): void {
    if (this.loginform.valid) {
      this.dataService.loginUser(this.loginform.value).subscribe({
        next: (response: any) => {
          if (response.token) {
            // Store the token in local storage
            localStorage.setItem('kyck_user', response.token);
          }
          this.toastr.success(response.message || 'Success', 'Success');
          this.router.navigate(['/table']);
        },
        error: (error: HttpErrorResponse) => {
          const errorResponse = error.error as ErrorResponse;
          this.toastr.error(errorResponse.message || 'An error occurred', 'Error');
        }
      });
    } else {
      this.markFormGroupTouched(this.loginform);
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
}
