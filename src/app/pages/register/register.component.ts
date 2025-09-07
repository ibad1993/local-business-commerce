import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h1>Create Account</h1>
          <p>Join Harry's Coffee community today</p>
        </div>
        
        <form (ngSubmit)="onRegister()" #registerForm="ngForm" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                [(ngModel)]="registerData.firstName" 
                #firstName="ngModel"
                required 
                minlength="2"
                class="form-input"
                [class.error]="firstName.invalid && firstName.touched"
                placeholder="Enter first name">
              <div *ngIf="firstName.invalid && firstName.touched" class="error-message">
                <span *ngIf="firstName.errors?.['required']">First name is required</span>
                <span *ngIf="firstName.errors?.['minlength']">First name must be at least 2 characters</span>
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                [(ngModel)]="registerData.lastName" 
                #lastName="ngModel"
                required 
                minlength="2"
                class="form-input"
                [class.error]="lastName.invalid && lastName.touched"
                placeholder="Enter last name">
              <div *ngIf="lastName.invalid && lastName.touched" class="error-message">
                <span *ngIf="lastName.errors?.['required']">Last name is required</span>
                <span *ngIf="lastName.errors?.['minlength']">Last name must be at least 2 characters</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="registerData.email" 
              #email="ngModel"
              required 
              email
              class="form-input"
              [class.error]="email.invalid && email.touched"
              placeholder="Enter your email">
            <div *ngIf="email.invalid && email.touched" class="error-message">
              <span *ngIf="email.errors?.['required']">Email is required</span>
              <span *ngIf="email.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="registerData.password" 
              #password="ngModel"
              required 
              minlength="6"
              class="form-input"
              [class.error]="password.invalid && password.touched"
              placeholder="Create a password">
            <div *ngIf="password.invalid && password.touched" class="error-message">
              <span *ngIf="password.errors?.['required']">Password is required</span>
              <span *ngIf="password.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              [(ngModel)]="registerData.confirmPassword" 
              #confirmPassword="ngModel"
              required 
              class="form-input"
              [class.error]="(confirmPassword.invalid && confirmPassword.touched) || passwordMismatch"
              placeholder="Confirm your password">
            <div *ngIf="(confirmPassword.invalid && confirmPassword.touched) || passwordMismatch" class="error-message">
              <span *ngIf="confirmPassword.errors?.['required']">Please confirm your password</span>
              <span *ngIf="passwordMismatch">Passwords do not match</span>
            </div>
          </div>

          <div *ngIf="errorMessage" class="error-message global-error">
            {{ errorMessage }}
          </div>

          <div *ngIf="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <button 
            type="submit" 
            class="register-btn"
            [disabled]="registerForm.invalid || isLoading || passwordMismatch">
            <span *ngIf="!isLoading">Create Account</span>
            <span *ngIf="isLoading">Creating Account...</span>
          </button>
        </form>

        <div class="register-footer">
          <p>Already have an account? <a routerLink="/login" class="link">Sign in here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #8d6e63 0%, #5d4037 100%);
      padding: 20px;
    }

    .register-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      padding: 40px;
      width: 100%;
      max-width: 500px;
    }

    .register-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .register-header h1 {
      color: #5d4037;
      margin: 0 0 10px 0;
      font-size: 2rem;
      font-weight: 600;
    }

    .register-header p {
      color: #666;
      margin: 0;
      font-size: 0.95rem;
    }

    .register-form {
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 6px;
      color: #333;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .form-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #8d6e63;
    }

    .form-input.error {
      border-color: #f44336;
    }

    .error-message {
      color: #f44336;
      font-size: 0.8rem;
      margin-top: 4px;
      display: block;
    }

    .global-error {
      text-align: center;
      background: #ffebee;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 15px;
    }

    .success-message {
      text-align: center;
      background: #e8f5e8;
      color: #2e7d32;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 15px;
    }

    .register-btn {
      width: 100%;
      background: #8d6e63;
      color: white;
      border: none;
      padding: 14px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .register-btn:hover:not(:disabled) {
      background: #6d4c41;
    }

    .register-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .register-footer {
      text-align: center;
      margin-top: 20px;
    }

    .register-footer p {
      color: #666;
      margin: 0;
      font-size: 0.9rem;
    }

    .link {
      color: #8d6e63;
      text-decoration: none;
      font-weight: 500;
    }

    .link:hover {
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }

    @media (max-width: 480px) {
      .register-card {
        padding: 30px 20px;
        margin: 10px;
      }
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is already logged in
    this.authService.getIsAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/']);
      }
    });
  }

  get passwordMismatch(): boolean {
    return this.registerData.password !== this.registerData.confirmPassword && 
           this.registerData.confirmPassword.length > 0;
  }

  async onRegister(): Promise<void> {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Check password match
    if (this.passwordMismatch) {
      this.errorMessage = 'Passwords do not match.';
      this.isLoading = false;
      return;
    }

    try {
      const success = await this.authService.register(
        this.registerData.email,
        this.registerData.password,
        this.registerData.firstName,
        this.registerData.lastName
      );
      
      if (success) {
        this.successMessage = 'Account created successfully! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      } else {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    } catch (error) {
      this.errorMessage = 'An error occurred. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}


