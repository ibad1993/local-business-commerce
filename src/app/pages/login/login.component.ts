import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your Harry's Coffee account</p>
        </div>
        
        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="login-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="loginData.email" 
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
              [(ngModel)]="loginData.password" 
              #password="ngModel"
              required 
              minlength="6"
              class="form-input"
              [class.error]="password.invalid && password.touched"
              placeholder="Enter your password">
            <div *ngIf="password.invalid && password.touched" class="error-message">
              <span *ngIf="password.errors?.['required']">Password is required</span>
              <span *ngIf="password.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>

          <div *ngIf="errorMessage" class="error-message global-error">
            {{ errorMessage }}
          </div>

          <button 
            type="submit" 
            class="login-btn"
            [disabled]="loginForm.invalid || isLoading">
            <span *ngIf="!isLoading">Sign In</span>
            <span *ngIf="isLoading">Signing In...</span>
          </button>
        </form>

        <div class="login-footer">
          <p>Don't have an account? <a routerLink="/register" class="link">Sign up here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #8d6e63 0%, #5d4037 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      padding: 40px;
      width: 100%;
      max-width: 400px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .login-header h1 {
      color: #5d4037;
      margin: 0 0 10px 0;
      font-size: 2rem;
      font-weight: 600;
    }

    .login-header p {
      color: #666;
      margin: 0;
      font-size: 0.95rem;
    }

    .login-form {
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

    .login-btn {
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

    .login-btn:hover:not(:disabled) {
      background: #6d4c41;
    }

    .login-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .login-footer {
      text-align: center;
      margin-top: 20px;
    }

    .login-footer p {
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

    @media (max-width: 480px) {
      .login-card {
        padding: 30px 20px;
        margin: 10px;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

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

  async onLogin(): Promise<void> {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const success = await this.authService.login(this.loginData.email, this.loginData.password);
      
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    } catch (error) {
      this.errorMessage = 'An error occurred. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}


