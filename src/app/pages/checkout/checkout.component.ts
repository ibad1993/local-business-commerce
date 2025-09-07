import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="checkout-page">
      <h1>Checkout</h1>
      <p>Checkout functionality coming soon!</p>
    </div>
  `,
  styles: [`
    .checkout-page {
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #5d4037;
      margin-bottom: 20px;
    }
  `]
})
export class CheckoutComponent {}


