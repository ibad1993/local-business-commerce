import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="orders-page">
      <h1>My Orders</h1>
      <p>Order history coming soon!</p>
    </div>
  `,
  styles: [`
    .orders-page {
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #5d4037;
      margin-bottom: 20px;
    }
  `]
})
export class OrdersComponent {}


