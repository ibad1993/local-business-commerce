// src/app/core/models/product.model.ts
import { ProductCategory } from '../../models/product-category.enum';

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
}

export interface CustomizationOption {
  name: string;
  values: string[]; // renamed from options
  priceModifier: number[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image?: string;
  nutritionalInfo?: NutritionalInfo;
  customizations?: CustomizationOption[];
}

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  customizations?: CustomizationOption[];
  notes?: string;
  addedAt?: Date;
}

// Additional interfaces for the e-commerce system
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  orderDate: Date;
  deliveryAddress?: Address;
  paymentMethod: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses?: Address[];
  preferences?: UserPreferences;
}

export interface UserPreferences {
  favoriteProducts?: string[];
  dietaryRestrictions?: string[];
  notificationPreferences?: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}


