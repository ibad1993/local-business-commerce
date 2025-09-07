import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="cart-page">
      <h1>Shopping Cart</h1>
      
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <mat-icon class="empty-cart-icon">shopping_cart</mat-icon>
        <h2>Your cart is empty</h2>
        <p>Add some delicious items to get started!</p>
        <button mat-raised-button color="primary" routerLink="/home">
          Continue Shopping
        </button>
      </div>

      <div *ngIf="cartItems.length > 0" class="cart-content">
        <div class="cart-items">
          <mat-card *ngFor="let item of cartItems" class="cart-item">
            <mat-card-content>
              <div class="item-details">
                <div class="item-info">
                  <h3>{{ item.product.name }}</h3>
                  <p>{{ item.product.description }}</p>
                  <p class="item-price">\${{ item.product.price.toFixed(2) }} each</p>
                </div>
                
                <div class="item-controls">
                  <div class="quantity-controls">
                    <button mat-icon-button (click)="updateQuantity(item.id!, item.quantity - 1)" 
                            [disabled]="item.quantity <= 1">
                      <mat-icon>remove</mat-icon>
                    </button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <button mat-icon-button (click)="updateQuantity(item.id!, item.quantity + 1)">
                      <mat-icon>add</mat-icon>
                    </button>
                  </div>
                  
                  <div class="item-total">
                    <strong>Total: \${{ item.totalPrice.toFixed(2) }}</strong>
                  </div>
                  
                  <button mat-icon-button color="warn" (click)="removeFromCart(item.id!)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="cart-summary">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Order Summary</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="summary-row">
                <span>Items ({{ totalItems }}):</span>
                <span>\${{ subtotal.toFixed(2) }}</span>
              </div>
              <mat-divider></mat-divider>
              <div class="summary-row total">
                <span><strong>Total:</strong></span>
                <span><strong>\${{ total.toFixed(2) }}</strong></span>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" routerLink="/checkout" 
                      [disabled]="cartItems.length === 0" class="checkout-btn">
                Proceed to Checkout
              </button>
              <button mat-stroked-button (click)="clearCart()" 
                      [disabled]="cartItems.length === 0">
                Clear Cart
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      color: #5d4037;
      margin-bottom: 30px;
      text-align: center;
    }

    .empty-cart {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-cart-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      margin-bottom: 20px;
    }

    .empty-cart h2 {
      color: #666;
      margin-bottom: 10px;
    }

    .empty-cart p {
      color: #999;
      margin-bottom: 30px;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 30px;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .cart-item {
      padding: 20px;
    }

    .item-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .item-info h3 {
      color: #5d4037;
      margin-bottom: 8px;
    }

    .item-info p {
      color: #666;
      margin-bottom: 5px;
    }

    .item-price {
      color: #ff9800;
      font-weight: 500;
    }

    .item-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .quantity {
      font-size: 18px;
      font-weight: 500;
      min-width: 30px;
      text-align: center;
    }

    .item-total {
      font-size: 16px;
      color: #5d4037;
    }

    .cart-summary {
      position: sticky;
      top: 100px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 16px;
    }

    .summary-row.total {
      font-size: 18px;
      margin-top: 10px;
    }

    .checkout-btn {
      width: 100%;
      margin-bottom: 10px;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
      
      .item-details {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .item-controls {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal = 0;
  total = 0;
  totalItems = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    this.total = this.subtotal; // No tax/shipping for now
    this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(itemId, newQuantity);
    }
  }

  removeFromCart(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
