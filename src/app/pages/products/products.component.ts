import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ProductCategory } from '../../models/product-category.enum';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <div class="products-page">
      <div class="page-header">
        <h1>Our Menu</h1>
        <p>Discover our delicious coffee, snacks, and merchandise</p>
      </div>

      <!-- Filters and Search -->
      <div class="filters-section">
        <div class="search-box">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search products...</mat-label>
            <input matInput [(ngModel)]="searchQuery" (input)="onSearch()" placeholder="e.g., cappuccino, muffin">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
        </div>

        <div class="category-filters">
          <mat-chip-listbox [(ngModel)]="selectedCategory" (selectionChange)="onCategoryChange()">
            <mat-chip-option value="">All Categories</mat-chip-option>
            <mat-chip-option [value]="ProductCategory.DRINKS">Coffee & Drinks</mat-chip-option>
            <mat-chip-option [value]="ProductCategory.SNACKS">Snacks & Pastries</mat-chip-option>
            <mat-chip-option [value]="ProductCategory.OTHER">Merchandise</mat-chip-option>
          </mat-chip-listbox>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-grid" *ngIf="filteredProducts.length > 0">
        <mat-card *ngFor="let product of filteredProducts" class="product-card">
          <div class="product-image">
            <img [src]="getProductImage(product)" [alt]="product.name" loading="lazy">
          </div>
          
          <mat-card-content>
            <div class="product-header">
              <h3>{{ product.name }}</h3>
              <span class="category-badge" [class]="getCategoryClass(product.category)">
                {{ getCategoryName(product.category) }}
              </span>
            </div>
            
            <p class="description">{{ product.description }}</p>
            
            <div class="product-details">
              <div class="price-section">
                <span class="price">\${{ product.price.toFixed(2) }}</span>
                <span class="unit">each</span>
              </div>
              
              <div class="nutritional-info" *ngIf="product.nutritionalInfo">
                <span class="calories">{{ product.nutritionalInfo.calories }} cal</span>
              </div>
            </div>

            <div class="customizations" *ngIf="product.customizations && product.customizations.length > 0">
              <p class="customization-label">Customizations available:</p>
              <div class="customization-chips">
                <span class="chip" *ngFor="let option of product.customizations">
                  {{ option.name }}
                </span>
              </div>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="addToCart(product)" class="add-to-cart-btn">
              <mat-icon>add_shopping_cart</mat-icon>
              Add to Cart
            </button>
            <button mat-stroked-button color="primary" [routerLink]="['/product', product.id]">
              View Details
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="filteredProducts.length === 0">
        <mat-icon class="empty-icon">search_off</mat-icon>
        <h3>No products found</h3>
        <p>Try adjusting your search or category filters</p>
        <button mat-raised-button color="primary" (click)="clearFilters()">
          Clear Filters
        </button>
      </div>
    </div>
  `,
  styles: [`
    .products-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .page-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .page-header h1 {
      color: #5d4037;
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    .page-header p {
      color: #666;
      font-size: 1.1rem;
    }

    .filters-section {
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .search-box {
      display: flex;
      justify-content: center;
    }

    .search-field {
      width: 100%;
      max-width: 400px;
    }

    .category-filters {
      display: flex;
      justify-content: center;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .product-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .product-image {
      height: 250px;
      overflow: hidden;
      border-radius: 8px 8px 0 0;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-image img {
      transform: scale(1.05);
    }

    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }

    .product-header h3 {
      color: #5d4037;
      margin: 0;
      font-size: 1.3rem;
    }

    .category-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .category-badge.drinks {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .category-badge.snacks {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }

    .category-badge.other {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .description {
      color: #666;
      line-height: 1.5;
      margin-bottom: 15px;
    }

    .product-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .price-section {
      display: flex;
      align-items: baseline;
      gap: 5px;
    }

    .price {
      font-size: 1.5rem;
      font-weight: 600;
      color: #ff9800;
    }

    .unit {
      color: #999;
      font-size: 0.9rem;
    }

    .nutritional-info .calories {
      background-color: #f5f5f5;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      color: #666;
    }

    .customizations {
      margin-bottom: 15px;
    }

    .customization-label {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 8px;
    }

    .customization-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .chip {
      background-color: #e8f5e8;
      color: #2e7d32;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 0.8rem;
    }

    mat-card-actions {
      margin-top: auto;
      display: flex;
      gap: 10px;
      padding: 16px;
    }

    .add-to-cart-btn {
      flex: 1;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      margin-bottom: 20px;
    }

    .empty-state h3 {
      color: #666;
      margin-bottom: 10px;
    }

    .empty-state p {
      color: #999;
      margin-bottom: 30px;
    }

    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: 1fr;
      }
      
      .filters-section {
        gap: 15px;
      }
      
      .page-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery = '';
  selectedCategory: ProductCategory | '' = '';
  
  // Make ProductCategory available to template
  ProductCategory = ProductCategory;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
  }

  onSearch() {
    this.applyFilters();
  }

  onCategoryChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.products];

    // Apply category filter
    if (this.selectedCategory !== '') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    this.filteredProducts = filtered;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.filteredProducts = [...this.products];
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1);
    console.log('Added to cart:', product.name);
  }

  getCategoryName(category: ProductCategory): string {
    switch (category) {
      case ProductCategory.DRINKS: return 'Drinks';
      case ProductCategory.SNACKS: return 'Snacks';
      case ProductCategory.OTHER: return 'Other';
      default: return 'Unknown';
    }
  }

  getCategoryClass(category: ProductCategory): string {
    switch (category) {
      case ProductCategory.DRINKS: return 'drinks';
      case ProductCategory.SNACKS: return 'snacks';
      case ProductCategory.OTHER: return 'other';
      default: return '';
    }
  }

  getProductImage(product: Product): string {
    // Use your sourced images for specific products
    const sourcedImageMap: Record<string, string> = {
      'americano': 'assets/images/americano.jpg',
      'blueberry muffin': 'assets/images/blueberrymuffin.jpg',
      'croissant': 'assets/images/croissant.jpg',
      'cinnamon roll': 'assets/images/cinnamonroll.jpg',
      'bagel with cream cheese': 'assets/images/BagelwithCreamCheese.jpg',
      'danish pastry': 'assets/images/pastrydanish.jpg',
      "harry's coffee hat": 'assets/images/coffeehat.jpg',
      'coffee bean bag': 'assets/images/coffeebeanbag.jpg',
    };

    const key = product.name.toLowerCase();
    if (sourcedImageMap[key]) return sourcedImageMap[key];

    // Fallback to Unsplash for other products
    const fallbackImageMap: Record<string, string> = {
      // DRINKS
      'classic cappuccino': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      'smooth latte': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop',
      'espresso shot': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
      'mocha': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
      'caramel macchiato': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      'iced coffee': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
      'hot tea': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',

      // SNACKS
      'chocolate chip cookie': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
      'brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
      'scone': 'assets/images/scone.jpg',

      // MERCHANDISE
      "harry's coffee mug": 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
      "harry's t-shirt": 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    };

    if (fallbackImageMap[key]) return fallbackImageMap[key];

    // Final fallback per category
    const fallback: Record<ProductCategory, string> = {
      [ProductCategory.DRINKS]: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      [ProductCategory.SNACKS]: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      [ProductCategory.OTHER]: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
    };

    return fallback[product.category] || fallback[ProductCategory.OTHER];
  }

}
