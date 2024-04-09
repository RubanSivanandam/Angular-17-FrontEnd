import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './loginform.service';
import { Router } from '@angular/router';


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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username:['',[Validators.required]],
      designation:['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginform.valid) {
      this.dataService.saveUserData(this.loginform.value).subscribe({
        next: (response) => {
          console.log('Data saved successfully:', response); 
          this.router.navigate(['/login/employees']);     // Navigate to the desired route after successful form submission
        },
        error: (error) => {
          console.error('Error saving data:', error);
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
