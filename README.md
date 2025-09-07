# Harry's Coffee Stop ☕

A modern, responsive e-commerce website built with Angular 18 and TypeScript, designed for Harry's Coffee Stop - a local coffee shop showcasing their products and services online.

![Harry's Coffee Stop](https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop)

## ✨ Features

### 🛒 **E-commerce Functionality**
- **Product Catalog** - Browse 20+ coffee drinks, snacks, and merchandise
- **Shopping Cart** - Full cart functionality with quantity controls
- **Product Details** - Individual product pages with descriptions and pricing
- **Category Filtering** - Filter by drinks, snacks, and merchandise

### 🔐 **Authentication System**
- **User Registration** - Create new accounts with form validation
- **User Login** - Secure authentication with error handling
- **Session Management** - Persistent login state with localStorage

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works perfectly on all devices
- **Beautiful Images** - 9 custom sourced product images
- **Smooth Animations** - Professional transitions and hover effects
- **Coffee Shop Branding** - Consistent brown/coffee color scheme

### 🚀 **Technical Features**
- **Angular 18** - Latest version with standalone components
- **TypeScript** - Full type safety and better development experience
- **Reactive Forms** - Template-driven forms with validation
- **Service Architecture** - Clean separation of concerns
- **Route Protection** - Authentication guards for protected pages

## 🛍️ Product Categories

### ☕ **Coffee Drinks**
- Classic Cappuccino
- Smooth Latte
- Espresso Shot
- Americano
- Mocha
- Caramel Macchiato
- Iced Coffee
- Hot Tea

### 🥐 **Snacks & Pastries**
- Blueberry Muffin
- Chocolate Chip Cookie
- Croissant
- Cinnamon Roll
- Bagel with Cream Cheese
- Brownie
- Scone
- Danish Pastry

### 🎁 **Merchandise**
- Harry's Coffee Mug
- Harry's Coffee Hat
- Coffee Bean Bag
- Harry's T-Shirt

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ibad1993/local-business-commerce.git
   cd local-business-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   └── product.model.ts      # Product interface definitions
│   │   └── services/
│   │       ├── auth.service.ts        # Authentication service
│   │       ├── cart.service.ts        # Shopping cart service
│   │       └── product.service.ts     # Product data service
│   ├── models/
│   │   └── product-category.enum.ts   # Product category enum
│   ├── pages/
│   │   ├── home/                      # Home page component
│   │   ├── products/                  # Product listing page
│   │   ├── product-detail/            # Individual product page
│   │   ├── cart/                      # Shopping cart page
│   │   ├── checkout/                  # Checkout page
│   │   ├── login/                     # Login page
│   │   ├── register/                  # Registration page
│   │   └── orders/                    # Order history page
│   ├── app.component.ts               # Main app component
│   ├── app.config.ts                  # App configuration
│   └── app.routes.ts                  # Routing configuration
├── assets/
│   └── images/                        # Product images
└── styles.scss                        # Global styles
```

## 🎨 Customization

### Adding Products
Edit the `products` array in `src/app/core/services/product.service.ts`:

```typescript
{
  id: '21',
  name: 'New Product',
  description: 'Product description',
  price: 4.99,
  category: ProductCategory.DRINKS,
  image: 'assets/images/new-product.jpg',
  nutritionalInfo: { /* ... */ },
  customizations: [ /* ... */ ]
}
```

### Styling
- Modify colors in `src/styles.scss`
- Update component-specific styles in individual component files
- Customize the coffee shop branding colors

### Business Information
Update contact details and business information in the components as needed.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### GitHub Pages (Automatic)
This repository is set up with GitHub Actions for automatic deployment:
1. Push to the `main` branch
2. GitHub Actions automatically builds and deploys to GitHub Pages
3. Your site will be available at: `https://ibad1993.github.io/local-business-commerce`

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist/harrys-coffee-stop` folder to your hosting provider

## 🧪 Testing

```bash
npm test
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🛠️ Technologies Used

- **Angular 18** - Frontend framework
- **TypeScript** - Programming language
- **SCSS** - CSS preprocessor
- **HTML5** - Semantic markup
- **RxJS** - Reactive programming
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Hosting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ibad1993/local-business-commerce/issues)
- **Repository**: [https://github.com/ibad1993/local-business-commerce](https://github.com/ibad1993/local-business-commerce)

## 🙏 Acknowledgments

- Built with Angular 18
- Designed for local coffee shop success
- Community-driven development

---

**Made with ❤️ for Harry's Coffee Stop**

_Support local coffee shops and build stronger communities!_

## Live Demo

🌐 **Live Site**: [https://ibad1993.github.io/local-business-commerce](https://ibad1993.github.io/local-business-commerce)

## Screenshots

### Home Page
![Home Page](https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop)

### Products Page
![Products Page](https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop)

### Login Page
![Login Page](https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop)