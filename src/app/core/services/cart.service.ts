// src/app/core/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private cartTotal = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartFromStorage();
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  getCartTotal(): Observable<number> {
    return this.cartTotal.asObservable();
  }

  getCartItemCount(): Observable<number> {
    return new Observable(observer => {
      this.cartItems.subscribe(items => {
        const count = items.reduce((total, item) => total + item.quantity, 0);
        observer.next(count);
      });
    });
  }

  addToCart(product: Product, quantity: number = 1, customizations: any[] = []): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      // Update existing item quantity
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.product.price * existingItem.quantity;
      if (customizations.length > 0) {
        existingItem.customizations = customizations;
      }
    } else {
      // Add new item
      const newItem: CartItem = {
        id: this.generateId(),
        product: product,
        quantity: quantity,
        totalPrice: product.price * quantity,
        customizations: customizations,
        notes: '',
        addedAt: new Date()
      };
      currentItems.push(newItem);
    }

    this.updateCart(currentItems);
  }

  removeFromCart(itemId: string): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.updateCart(updatedItems);
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.id === itemId);
    
    if (item) {
      item.quantity = quantity;
      item.totalPrice = item.product.price * quantity;
      this.updateCart(currentItems);
    }
  }

  updateCustomizations(itemId: string, customizations: any[]): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.id === itemId);
    
    if (item) {
      item.customizations = customizations;
      this.updateCart(currentItems);
    }
  }

  updateNotes(itemId: string, notes: string): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.id === itemId);
    
    if (item) {
      item.notes = notes;
      this.updateCart(currentItems);
    }
  }

  clearCart(): void {
    this.updateCart([]);
  }

  // Helper method to check if cart is empty
  isCartEmpty(): boolean {
    return this.cartItems.value.length === 0;
  }

  // Helper method to get cart items as array (for immediate access)
  getCartItemsArray(): CartItem[] {
    return this.cartItems.value;
  }

  private updateCart(items: CartItem[]): void {
    this.cartItems.next(items);
    this.calculateTotal(items);
    this.saveCartToStorage(items);
  }

  private calculateTotal(items: CartItem[]): void {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    this.cartTotal.next(total);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveCartToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem('harrys-cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem('harrys-cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        // Convert dates back to Date objects
        items.forEach((item: CartItem) => {
          if (item.addedAt) {
            item.addedAt = new Date(item.addedAt);
          }
        });
        this.updateCart(items);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }
}
