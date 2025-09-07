// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product, CustomizationOption, NutritionalInfo } from '../models/product.model';
import { ProductCategory } from '../../models/product-category.enum';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    // COFFEE DRINKS
    {
      id: '1',
      name: 'Classic Cappuccino',
      description: 'Perfectly balanced espresso with steamed milk and velvety foam',
      price: 4.50,
      category: ProductCategory.DRINKS,
      nutritionalInfo: {
        calories: 120,
        protein: 8,
        carbs: 12,
        fat: 6,
        sugar: 8
      },
      customizations: [
        { name: 'Size', values: ['Small', 'Medium', 'Large'], priceModifier: [0, 0.50, 1.00] },
        { name: 'Milk', values: ['Whole', 'Skim', 'Almond', 'Oat'], priceModifier: [0, 0, 0.75, 0.75] }
      ]
    },
    {
      id: '2',
      name: 'Smooth Latte',
      description: 'Rich espresso with creamy steamed milk for a smooth, comforting drink',
      price: 4.00,
      category: ProductCategory.DRINKS,
      nutritionalInfo: {
        calories: 110,
        protein: 5,
        carbs: 10,
        fat: 5,
        sugar: 7
      },
      customizations: [
        { name: 'Size', values: ['Small', 'Medium', 'Large'], priceModifier: [0, 0.50, 1.00] },
        { name: 'Milk', values: ['Whole', 'Skim', 'Almond', 'Oat'], priceModifier: [0, 0, 0.75, 0.75] }
      ]
    },
    {
      id: '3',
      name: 'Espresso Shot',
      description: 'Single shot of our finest roasted espresso - pure coffee perfection',
      price: 2.50,
      category: ProductCategory.DRINKS,
      nutritionalInfo: {
        calories: 5,
        protein: 0,
        carbs: 1,
        fat: 0,
        sugar: 0
      },
      customizations: [
        { name: 'Size', values: ['Single', 'Double'], priceModifier: [0, 1.50] }
      ]
    },
    {
      id: '4',
      name: 'Americano',
      description: 'Espresso with hot water for a bold, smooth coffee experience',
      price: 3.00,
      category: ProductCategory.DRINKS,
      image: 'assets/images/americano.jpg',
      nutritionalInfo: {
        calories: 5,
        protein: 0,
        carbs: 1,
        fat: 0,
        sugar: 0
      },
      customizations: [
        { name: 'Size', values: ['Small', 'Medium', 'Large'], priceModifier: [0, 0.50, 1.00] }
      ]
    },
    {
      id: '5',
      name: 'Mocha',
      description: 'Espresso with rich chocolate and steamed milk, topped with whipped cream',
      price: 5.00,
      category: ProductCategory.DRINKS,
      nutritionalInfo: {
        calories: 180,
        protein: 6,
        carbs: 25,
        fat: 8,
        sugar: 20
      },
      customizations: [
        { name: 'Size', values: ['Small', 'Medium', 'Large'], priceModifier: [0, 0.50, 1.00] },
        { name: 'Milk', values: ['Whole', 'Skim', 'Almond', 'Oat'], priceModifier: [0, 0, 0.75, 0.75] }
      ]
    },
    {
      id: '6',
      name: 'Caramel Macchiato',
      description: 'Espresso with vanilla-flavored steamed milk and caramel drizzle',
      price: 5.25,
      category: ProductCategory.DRINKS,
      nutritionalInfo: {
        calories: 160,
        protein: 5,
        carbs: 22,
        fat: 6,
        sugar: 18
      },
      customizations: [
        { name: 'Size', values: ['Small', 'Medium', 'Large'], priceModifier: [0, 0.50, 1.00] },
        { name: 'Milk', values: ['Whole', 'Skim', 'Almond', 'Oat'], priceModifier: [0, 0, 0.75, 0.75] }
      ]
    },
    {
      id: '7',
      name: 'Iced Coffee',
      description: 'Chilled coffee served over ice with your choice of milk',
      price: 3.75,
      category: ProductCategory.DRINKS,
      nutritionalInfo: {
        calories: 80,
        protein: 3,
        carbs: 8,
        fat: 3,
        sugar: 5
      },
      customizations: [
        { name: 'Size', values: ['Medium', 'Large'], priceModifier: [0, 0.75] },
        { name: 'Milk', values: ['Whole', 'Skim', 'Almond', 'Oat'], priceModifier: [0, 0, 0.75, 0.75] }
      ]
    },
    {
      id: '8',
      name: 'Hot Tea',
      description: 'Premium loose-leaf tea served hot with honey and lemon options',
      price: 3.25,
      category: ProductCategory.DRINKS,
      nutritionalInfo: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        sugar: 0
      },
      customizations: [
        { name: 'Type', values: ['Earl Grey', 'Chamomile', 'Green', 'Black'], priceModifier: [0, 0, 0, 0] },
        { name: 'Add-ons', values: ['Honey', 'Lemon', 'Milk'], priceModifier: [0.50, 0.25, 0.50] }
      ]
    },

    // SNACKS & PASTRIES
    {
      id: '9',
      name: 'Blueberry Muffin',
      description: 'Fresh baked muffin loaded with juicy blueberries and a sweet crumb topping',
      price: 3.25,
      category: ProductCategory.SNACKS,
      image: 'assets/images/blueberrymuffin.jpg',
      nutritionalInfo: {
        calories: 280,
        protein: 4,
        carbs: 45,
        fat: 10,
        sugar: 25
      }
    },
    {
      id: '10',
      name: 'Chocolate Chip Cookie',
      description: 'Warm, gooey chocolate chip cookies made fresh daily with premium chocolate',
      price: 2.75,
      category: ProductCategory.SNACKS,
      nutritionalInfo: {
        calories: 180,
        protein: 2,
        carbs: 25,
        fat: 8,
        sugar: 15
      }
    },
    {
      id: '11',
      name: 'Croissant',
      description: 'Buttery, flaky French croissant baked fresh every morning',
      price: 3.50,
      category: ProductCategory.SNACKS,
      image: 'assets/images/croissant.jpg',
      nutritionalInfo: {
        calories: 220,
        protein: 4,
        carbs: 22,
        fat: 12,
        sugar: 3
      }
    },
    {
      id: '12',
      name: 'Cinnamon Roll',
      description: 'Sweet cinnamon roll with cream cheese frosting and pecans',
      price: 4.25,
      category: ProductCategory.SNACKS,
      image: 'assets/images/cinnamonroll.jpg',
      nutritionalInfo: {
        calories: 320,
        protein: 5,
        carbs: 48,
        fat: 12,
        sugar: 28
      }
    },
    {
      id: '13',
      name: 'Bagel with Cream Cheese',
      description: 'Fresh bagel served with generous portion of cream cheese',
      price: 3.75,
      category: ProductCategory.SNACKS,
      image: 'assets/images/BagelwithCreamCheese.jpg',
      nutritionalInfo: {
        calories: 280,
        protein: 8,
        carbs: 45,
        fat: 8,
        sugar: 5
      }
    },
    {
      id: '14',
      name: 'Brownie',
      description: 'Rich, fudgy chocolate brownie with chocolate chips',
      price: 3.00,
      category: ProductCategory.SNACKS,
      nutritionalInfo: {
        calories: 240,
        protein: 3,
        carbs: 32,
        fat: 12,
        sugar: 24
      }
    },
    {
      id: '15',
      name: 'Scone',
      description: 'Traditional British scone with your choice of blueberry or cranberry',
      price: 3.50,
      category: ProductCategory.SNACKS,
      image: 'assets/images/scone.jpg',
      nutritionalInfo: {
        calories: 260,
        protein: 5,
        carbs: 38,
        fat: 10,
        sugar: 12
      }
    },
    {
      id: '16',
      name: 'Danish Pastry',
      description: 'Flaky pastry filled with fruit preserves and topped with icing',
      price: 4.00,
      category: ProductCategory.SNACKS,
      image: 'assets/images/pastrydanish.jpg',
      nutritionalInfo: {
        calories: 290,
        protein: 4,
        carbs: 42,
        fat: 12,
        sugar: 22
      }
    },

    // MERCHANDISE & OTHER
    {
      id: '17',
      name: 'Harry\'s Coffee Mug',
      description: 'Premium ceramic mug with our signature logo - perfect for your morning coffee',
      price: 18.99,
      category: ProductCategory.OTHER,
      customizations: [
        { name: 'Size', values: ['12oz', '16oz'], priceModifier: [0, 2.00] }
      ]
    },
    {
      id: '18',
      name: 'Harry\'s Coffee Hat',
      description: 'Stylish baseball cap with embroidered coffee logo - show your coffee love',
      price: 24.99,
      category: ProductCategory.OTHER,
      image: 'assets/images/coffeehat.jpg',
      customizations: [
        { name: 'Size', values: ['S/M', 'L/XL'], priceModifier: [0, 0] }
      ]
    },
    {
      id: '19',
      name: 'Coffee Bean Bag',
      description: '1lb bag of our signature house blend coffee beans - roast date included',
      price: 16.99,
      category: ProductCategory.OTHER,
      image: 'assets/images/coffeebeanbag.jpg'
    },
    {
      id: '20',
      name: 'Harry\'s T-Shirt',
      description: 'Comfortable cotton t-shirt featuring our coffee shop design',
      price: 22.99,
      category: ProductCategory.OTHER,
      customizations: [
        { name: 'Size', values: ['S', 'M', 'L', 'XL'], priceModifier: [0, 0, 0, 0] }
      ]
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(category: ProductCategory): Product[] {
    return this.products.filter(p => p.category === category);
  }

  searchProducts(query: string): Product[] {
    const searchTerm = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }
}
