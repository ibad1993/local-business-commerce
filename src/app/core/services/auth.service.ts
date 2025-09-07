import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkAuthStatus();
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simple mock authentication
      if (email && password) {
        const user: User = {
          id: '1',
          email: email,
          firstName: 'John',
          lastName: 'Doe'
        };
        
        // Store auth token
        localStorage.setItem('harrys-auth-token', 'mock-jwt-token');
        localStorage.setItem('harrys-user', JSON.stringify(user));
        
        this.currentUser.next(user);
        this.isAuthenticated.next(true);
        
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  register(email: string, password: string, firstName: string, lastName: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simple mock registration
      if (email && password && firstName && lastName) {
        const user: User = {
          id: Date.now().toString(),
          email: email,
          firstName: firstName,
          lastName: lastName
        };
        
        // Store auth token
        localStorage.setItem('harrys-auth-token', 'mock-jwt-token');
        localStorage.setItem('harrys-user', JSON.stringify(user));
        
        this.currentUser.next(user);
        this.isAuthenticated.next(true);
        
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('harrys-auth-token');
    localStorage.removeItem('harrys-user');
    
    this.currentUser.next(null);
    this.isAuthenticated.next(false);
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('harrys-auth-token');
    const userData = localStorage.getItem('harrys-user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUser.next(user);
        this.isAuthenticated.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }
}


