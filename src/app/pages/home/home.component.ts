import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ProductCategory } from '../../models/product-category.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Welcome to Harry's Coffee Stop</h1>
          <p>Your local coffee haven where every cup tells a story</p>
          <div class="hero-buttons">
            <button mat-raised-button color="accent" routerLink="/products">
              <mat-icon>restaurant_menu</mat-icon>
              View Full Menu
            </button>
            <button mat-stroked-button color="accent" routerLink="/cart">
              <mat-icon>shopping_cart</mat-icon>
              View Cart
            </button>
          </div>
        </div>
      </section>

      <!-- Coffee Lifestyle Slideshow -->
      <section class="slideshow-section">
        <div class="container">
          <h2>Experience the Coffee Lifestyle</h2>
          <div class="slideshow-container">
            <div class="slide active">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop" 
                   alt="People enjoying coffee at a cafe" 
                   loading="lazy">
              <div class="slide-caption">
                <h3>Community & Connection</h3>
                <p>Where friends meet over great coffee</p>
              </div>
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=500&fit=crop" 
                   alt="Barista crafting coffee" 
                   loading="lazy">
              <div class="slide-caption">
                <h3>Artisan Craftsmanship</h3>
                <p>Every cup is crafted with passion</p>
              </div>
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop" 
                   alt="Cozy cafe atmosphere" 
                   loading="lazy">
              <div class="slide-caption">
                <h3>Cozy Atmosphere</h3>
                <p>Your perfect spot to relax and recharge</p>
              </div>
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1442513624770-3a4f0143632c?w=800&h=500&fit=crop" 
                   alt="Coffee and conversation" 
                   loading="lazy">
              <div class="slide-caption">
                <h3>Great Conversations</h3>
                <p>Ideas flow as freely as the coffee</p>
              </div>
            </div>
          </div>
          <div class="slideshow-controls">
            <button class="control-btn prev" (click)="previousSlide()">
              <mat-icon>chevron_left</mat-icon>
            </button>
            <div class="slide-indicators">
              <span class="indicator active" (click)="goToSlide(0)"></span>
              <span class="indicator" (click)="goToSlide(1)"></span>
              <span class="indicator" (click)="goToSlide(2)"></span>
              <span class="indicator" (click)="goToSlide(3)"></span>
            </div>
            <button class="control-btn next" (click)="nextSlide()">
              <mat-icon>chevron_right</mat-icon>
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="featured-products">
        <div class="container">
          <h2>Featured Favorites</h2>
          <div class="products-grid">
            <div class="product-image-card" *ngFor="let product of featuredProducts">
              <div class="product-image">
                <img [src]="getProductImage(product)" [alt]="product.name" loading="lazy">
              </div>
              <div class="product-overlay">
                <h3>{{ product.name }}</h3>
                <span class="category-badge" [class]="getCategoryClass(product.category)">
                  {{ getCategoryName(product.category) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="about-section">
        <div class="container">
          <div class="about-content">
            <div class="about-text">
              <h2>Why Choose Harry's?</h2>
              <div class="features-list">
                <div class="feature">
                  <mat-icon>coffee</mat-icon>
                  <div>
                    <h4>Fresh Roasted Coffee</h4>
                    <p>We roast our beans in-house daily for the perfect cup every time</p>
                  </div>
                </div>
                <div class="feature">
                  <mat-icon>bakery_dining</mat-icon>
                  <div>
                    <h4>Homemade Baked Goods</h4>
                    <p>Fresh pastries, muffins, and cookies baked fresh every morning</p>
                  </div>
                </div>
                <div class="feature">
                  <mat-icon>favorite</mat-icon>
                  <div>
                    <h4>Community Focused</h4>
                    <p>Supporting local farmers and building community connections</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="about-image">
              <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=400&fit=crop" 
                   alt="Coffee shop interior" 
                   loading="lazy">
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta-section">
        <div class="container">
          <h2>Ready to experience the best coffee in town?</h2>
          <p>Browse our menu and start your coffee journey today</p>
          <div class="cta-buttons">
            <button mat-raised-button color="accent" routerLink="/products">
              Explore Menu
            </button>
            <button mat-stroked-button color="accent" routerLink="/cart">
              View Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Hero Section */
    .hero {
      background: linear-gradient(135deg, #8d6e63 0%, #6d4c41 100%);
      color: white;
      padding: 100px 20px;
      text-align: center;
    }

    .hero h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: #ff9800;
    }

    .hero p {
      font-size: 1.4rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .hero-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-buttons button {
      padding: 12px 24px;
      font-size: 1.1rem;
    }

    /* Slideshow Section */
    .slideshow-section {
      padding: 80px 0;
      background-color: #fafafa;
    }

    .slideshow-section h2 {
      text-align: center;
      font-size: 2.5rem;
      color: #5d4037;
      margin-bottom: 50px;
      font-weight: 600;
    }

    .slideshow-container {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .slide {
      display: none;
      position: relative;
    }

    .slide.active {
      display: block;
    }

    .slide img {
      width: 100%;
      height: 500px;
      object-fit: cover;
      display: block;
    }

    .slide-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      color: white;
      padding: 40px 20px 20px;
      text-align: center;
    }

    .slide-caption h3 {
      font-size: 1.8rem;
      margin-bottom: 10px;
      color: #ff9800;
    }

    .slide-caption p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .slideshow-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      margin-top: 30px;
    }

    .control-btn {
      background: #5d4037;
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .control-btn:hover {
      background: #ff9800;
      transform: scale(1.1);
    }

    .slide-indicators {
      display: flex;
      gap: 10px;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ccc;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .indicator.active {
      background: #ff9800;
      transform: scale(1.2);
    }

    /* Featured Products */
    .featured-products {
      padding: 80px 0;
    }

    .featured-products h2 {
      text-align: center;
      font-size: 2.5rem;
      color: #5d4037;
      margin-bottom: 50px;
      font-weight: 600;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }

    .product-image-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }

    .product-image-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }

    .product-image {
      height: 250px;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-image-card:hover .product-image img {
      transform: scale(1.05);
    }

    .product-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      color: white;
      padding: 20px;
      text-align: center;
    }

    .product-overlay h3 {
      color: white;
      margin: 0 0 10px 0;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .category-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 500;
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    /* About Section */
    .about-section {
      padding: 80px 0;
      background-color: #fafafa;
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .about-text h2 {
      color: #5d4037;
      font-size: 2.5rem;
      margin-bottom: 40px;
      font-weight: 600;
    }

    .features-list {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .feature {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    .feature mat-icon {
      color: #ff9800;
      font-size: 32px;
      width: 32px;
      height: 32px;
      margin-top: 5px;
    }

    .feature h4 {
      color: #5d4037;
      margin-bottom: 10px;
      font-size: 1.3rem;
    }

    .feature p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    .about-image {
      display: flex;
      justify-content: center;
    }

    .about-image img {
      width: 400px;
      height: 400px;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    /* CTA Section */
    .cta-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
      color: white;
      text-align: center;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #ff9800;
    }

    .cta-section p {
      font-size: 1.2rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .cta-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .cta-buttons button {
      padding: 12px 24px;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .slide img {
        height: 300px;
      }
      
      .slide-caption h3 {
        font-size: 1.4rem;
      }
      
      .products-grid {
        grid-template-columns: 1fr;
      }
      
      .about-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .about-image img {
        width: 300px;
        height: 300px;
      }
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  featuredProducts: Product[] = [];
  currentSlide = 0;
  
  // Make ProductCategory available to template
  ProductCategory = ProductCategory;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.selectFeaturedProducts();
    this.startSlideshow();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  selectFeaturedProducts() {
    // Select 6 diverse products for the featured section (only drinks and snacks)
    const drinks = this.products.filter(p => p.category === ProductCategory.DRINKS).slice(0, 3);
    const snacks = this.products.filter(p => p.category === ProductCategory.SNACKS).slice(0, 3);
    
    this.featuredProducts = [...drinks, ...snacks];
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
    // Map each product name to a specific image URL
    const imageMap: Record<string, string> = {
      // DRINKS
      'classic cappuccino': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      'smooth latte': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop',
      'espresso shot': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
      'americano': 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
      'mocha': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
      'caramel macchiato': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      'iced coffee': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
      'hot tea': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',

      // SNACKS
      'blueberry muffin': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      'chocolate chip cookie': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
      'croissant': 'assets/images/croissant.jpg',
      'cinnamon roll': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      'bagel with cream cheese': 'https://images.unsplash.com/photo-1565958011703-44e8b7b3b098?w=400&h=300&fit=crop',
      'brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
      'scone': 'assets/images/scone.jpg',
      'danish pastry': 'https://images.unsplash.com/photo-1565958011703-44e8b7b3b098?w=400&h=300&fit=crop',

      // MERCHANDISE
      "harry's coffee mug": 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
      "harry's coffee hat": 'https://images.unsplash.com/photo-1521369909029-2afc88201f8e?w=400&h=300&fit=crop',
      'coffee bean bag': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
      "harry's t-shirt": 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    };

    const key = product.name.toLowerCase();
    if (imageMap[key]) return imageMap[key];

    // Fallback per category
    const fallback: Record<ProductCategory, string> = {
      [ProductCategory.DRINKS]: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      [ProductCategory.SNACKS]: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      [ProductCategory.OTHER]: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
    };

    return fallback[product.category] || fallback[ProductCategory.OTHER];
  }

  startSlideshow() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[this.currentSlide].classList.remove('active');
    indicators[this.currentSlide].classList.remove('active');
    
    this.currentSlide = (this.currentSlide + 1) % slides.length;
    
    slides[this.currentSlide].classList.add('active');
    indicators[this.currentSlide].classList.add('active');
  }

  previousSlide() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[this.currentSlide].classList.remove('active');
    indicators[this.currentSlide].classList.remove('active');
    
    this.currentSlide = (this.currentSlide - 1 + 4) % 4;
    
    slides[this.currentSlide].classList.add('active');
    indicators[this.currentSlide].classList.add('active');
  }

  goToSlide(index: number) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[this.currentSlide].classList.remove('active');
    indicators[this.currentSlide].classList.add('active');
    
    this.currentSlide = index;
    
    slides[this.currentSlide].classList.add('active');
    indicators[this.currentSlide].classList.add('active');
  }
}
