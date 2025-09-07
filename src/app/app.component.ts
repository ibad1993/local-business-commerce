import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from './core/services/cart.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar color="primary" class="coffee-toolbar">
      <button mat-icon-button (click)="sidenav.toggle()" class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>
      
      <span class="brand-name">
        <mat-icon class="brand-icon">local_cafe</mat-icon>
        Harry's Coffee Stop
      </span>
      
      <span class="spacer"></span>
      
      <nav class="desktop-nav">
        <a mat-button routerLink="/home">Home</a>
        <a mat-button routerLink="/products">Menu</a>
        <a mat-button routerLink="/cart" class="cart-link">
          <mat-icon [matBadge]="cartItemCount" matBadgeColor="accent">shopping_cart</mat-icon>
        </a>
        <button mat-button *ngIf="isLoggedIn">
          <mat-icon>account_circle</mat-icon>
          Account
        </button>
        <a mat-button routerLink="/login" *ngIf="!isLoggedIn">Login</a>
      </nav>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="over" class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/home" (click)="sidenav.close()">
            <mat-icon>home</mat-icon>
            <span>Home</span>
          </a>
          <a mat-list-item routerLink="/products" (click)="sidenav.close()">
            <mat-icon>restaurant_menu</mat-icon>
            <span>Menu</span>
          </a>
          <a mat-list-item routerLink="/cart" (click)="sidenav.close()">
            <mat-icon>shopping_cart</mat-icon>
            <span>Cart</span>
          </a>
          <mat-divider></mat-divider>
          <a mat-list-item routerLink="/login" (click)="sidenav.close()" *ngIf="!isLoggedIn">
            <mat-icon>login</mat-icon>
            <span>Login</span>
          </a>
          <a mat-list-item routerLink="/register" (click)="sidenav.close()" *ngIf="!isLoggedIn">
            <mat-icon>person_add</mat-icon>
            <span>Register</span>
          </a>
          <a mat-list-item routerLink="/orders" (click)="sidenav.close()" *ngIf="isLoggedIn">
            <mat-icon>receipt</mat-icon>
            <span>My Orders</span>
          </a>
          <button mat-list-item (click)="logout(); sidenav.close()" *ngIf="isLoggedIn">
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Harry's Coffee Stop</h3>
          <p>Your local coffee haven since 2020</p>
          <p>📍 123 Coffee Street, Brewtown</p>
          <p>📞 (555) 123-4567</p>
        </div>
        <div class="footer-section">
          <h4>Hours</h4>
          <p>Mon-Fri: 6AM - 8PM</p>
          <p>Sat-Sun: 7AM - 9PM</p>
        </div>
        <div class="footer-section">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">Twitter</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Harry's Coffee Stop. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .coffee-toolbar {
      background: linear-gradient(135deg, #8d6e63 0%, #6d4c41 100%);
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .brand-name {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 500;
      margin-left: 16px;
    }

    .brand-icon {
      margin-right: 8px;
      color: #ff9800;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .cart-link {
      display: flex;
      align-items: center;
    }

    .sidenav-container {
      height: 100vh;
      margin-top: 64px;
    }

    .sidenav {
      width: 250px;
      background-color: #fafafa;
    }

    .main-content {
      padding: 20px;
      background-color: #fafafa;
      min-height: calc(100vh - 64px);
    }

    .footer {
      background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
      color: white;
      padding: 40px 0 20px;
      margin-top: 40px;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      padding: 0 20px;
    }

    .footer-section h3, .footer-section h4 {
      color: #ff9800;
      margin-bottom: 16px;
    }

    .social-links {
      display: flex;
      gap: 16px;
    }

    .social-link {
      color: #ff9800;
      text-decoration: none;
      transition: color 0.3s;
    }

    .social-link:hover {
      color: #ffb74d;
    }

    .footer-bottom {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #4e342e;
    }

    @media (max-width: 768px) {
      .desktop-nav {
        display: none;
      }
      
      .brand-name {
        font-size: 1.2rem;
      }
      
      .main-content {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  title = "Harry's Coffee Stop";
  cartItemCount = 0;
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to cart item count updates
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });

    // Subscribe to authentication status
    this.authService.getIsAuthenticated().subscribe(isAuth => {
      this.isLoggedIn = isAuth;
    });
  }

  logout() {
    this.authService.logout();
  }
}
