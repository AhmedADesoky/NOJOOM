# 🌹 NOJOOM Storefront

Premium Egyptian cotton dresses & essentials. Luxury meets simplicity with our rose & ivory aesthetic.

## 🚀 Quick Start

### Installation

```bash
# Navigate to project
cd C:\NOJOOM\NOJOOM_Website\Frontend\nojoom-frontend

# Install dependencies
npm install

# Create environment file
echo NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql > .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.

## 📱 Features

- **Mobile-First Design**: Optimized for phones (primary traffic)
- **Product Browsing**: Category filters, grid layout (2/3/4 columns)
- **Shopping Cart**: Add/remove items, update quantities
- **Wishlist**: Save favorite products
- **Checkout Flow**: Delivery form + payment method selection
- **Order Confirmation**: Success page with order details

## 🎨 Design System

### Color Palette
```
Primary White:  #FFFFFF
Off White:      #FAF6F7
Surface:        #F2EBEE
Brand Pink:     #E392B0 (CTAs & accents)
Rose Dark:      #C76A91 (Hover states)
Muted:          #8A7E83 (Secondary text)
Ink:            #2B2326 (Body text)
```

### Typography
- **Display**: Cormorant Garamond (serif, luxury)
- **Body**: Jost (geometric sans-serif)
- **Arabic**: Aref Ruqaa (نجوم wordmark)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header_Navigation.tsx
│   ├── Product_Card.tsx
│   ├── Cart_Drawer.tsx
│   └── ...
├── contexts/           # Global state (Cart, Wishlist)
├── graphql/           # Apollo Client + queries/mutations
└── styles/            # Tailwind configuration

app/
├── page.tsx           # Homepage
├── checkout/          # Checkout page
└── confirmation/      # Order confirmation
```

## 🔄 Naming Convention

All variables, functions, and components use `Capital_Case_With_Underscores`:

```typescript
// Variables
const Product_Name = "Rose Cotton Dress";
const Price_In_LE = 599;

// Functions
const Handle_Add_To_Cart = () => { };
const Fetch_Products = async () => { };

// Components
export const Product_Card = () => { };
export const Header_Navigation = () => { };

// Hooks
const { Cart_Items } = use_Cart_Context();
```

## 📦 Tech Stack

- **Framework**: Next.js 16+ (React SSR)
- **Styling**: Tailwind CSS v4
- **State**: React Context API + Zustand
- **GraphQL**: Apollo Client
- **Database**: Supabase PostgreSQL (backend)
- **Fonts**: Google Fonts (Cormorant, Jost)

## 🔌 API Integration

The storefront connects to the backend GraphQL APIs:

```typescript
// User API (Port 4000)
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql

// Endpoints:
- GET_PRODUCTS_QUERY: Fetch all products
- CREATE_ORDER_MUTATION: Place order
- ADD_TO_CART_MUTATION: Add items to cart
```

## 🛠️ Available Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## 📖 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup instructions
- [tailwind.config.ts](./tailwind.config.ts) - Tailwind theme configuration
- [src/graphql/](./src/graphql/) - GraphQL queries and mutations

## 🎯 Development Roadmap

### ✅ Completed
- [x] Homepage with product grid
- [x] Cart management
- [x] Wishlist functionality
- [x] Checkout flow
- [x] Order confirmation
- [x] Responsive design
- [x] Color scheme & typography

### 🔄 In Progress
- [ ] Product detail page
- [ ] Real GraphQL integration
- [ ] Product filters
- [ ] User authentication

### ⏳ Planned
- [ ] Order tracking
- [ ] Admin dashboard
- [ ] Payment integration (InstaPay)
- [ ] Email notifications

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Dependencies issue?**
```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

**GraphQL connection error?**
- Ensure Backend is running on port 4000
- Check `.env.local` has correct `NEXT_PUBLIC_GRAPHQL_URI`

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [React Context API](https://react.dev/reference/react/useContext)

## 👥 Team

NOJOOM Frontend built with ❤️

---

**Status**: 🚀 Ready for Backend Integration

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
