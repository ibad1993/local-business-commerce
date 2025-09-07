import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-detail-page">
      <h1>Product Details</h1>
      <p>Product detail page coming soon!</p>
    </div>
  `,
  styles: [`
    .product-detail-page {
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #5d4037;
      margin-bottom: 20px;
    }
  `]
})
export class ProductDetailComponent {}


