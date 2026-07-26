# NOJOOM Frontend - Installation & Setup Guide

## 🎨 Design Overview

The NOJOOM storefront features:
- **Rose & Ivory Aesthetic**: Luxury brand positioning with pink accents
- **Mobile-First Design**: Optimized for phone primary traffic
- **Premium Typography**: Cormorant Garamond (display) + Jost (body)
- **Smooth Interactions**: Animations, hover states, micro-interactions

## 📦 Installation

### 1. Install Dependencies

```bash
cd C:\NOJOOM\NOJOOM_Website\Frontend\nojoom-frontend
npm install
```

### 2. Setup Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
nojoom-frontend/
├── src/
│   ├── components/
│   │   ├── Button_Primary.tsx           # Reusable button component
│   │   ├── Icon_Cart.tsx               # Cart icon with badge
│   │   ├── Icon_Wishlist.tsx           # Wishlist heart icon
│   │   ├── Header_Navigation.tsx       # Sticky header with menu
│   │   ├── Hero_Section.tsx            # Rose collection banner
│   │   ├── Product_Card.tsx            # Individual product card
│   │   ├── Product_Grid.tsx            # Responsive product grid
│   │   ├── Category_Filter.tsx         # Category tabs
│   │   ├── Cart_Drawer.tsx             # Slide-in cart
│   │   └── Footer_Section.tsx          # Footer with links
│   │
│   ├── contexts/
│   │   ├── Cart_Context.tsx            # Global cart state
│   │   ├── Wishlist_Context.tsx        # Global wishlist state
│   │   └── Providers.tsx               # Provider wrapper
│   │
│   ├── graphql/
│   │   ├── Apollo_Client.ts            # Apollo client config
│   │   ├── Get_Queries.ts              # GraphQL queries
│   │   └── Post_Mutations.ts           # GraphQL mutations
│   │
│   └── styles/
│       └── (Tailwind config in tailwind.config.ts)
│
├── app/
│   ├── page.tsx                        # Homepage
│   ├── checkout/
│   │   └── page.tsx                    # Checkout page
│   ├── confirmation/
│   │   └── page.tsx                    # Order confirmation
│   ├── layout.tsx                      # Root layout with fonts
│   └── globals.css                     # Global styles
│
├── public/                             # Static assets
├── package.json
├── tailwind.config.ts                  # Tailwind configuration
├── tsconfig.json                       # TypeScript config
├── next.config.ts                      # Next.js config
└── .env.example                        # Environment variables template
```

## 🎨 Color Palette

### Storefront (Light Theme)
- **Primary White**: `#FFFFFF`
- **Off White**: `#FAF6F7`
- **Surface**: `#F2EBEE`
- **Border**: `#E5DBDF`
- **Blush**: `#F7D9E3`
- **Brand Pink**: `#E392B0` (CTAs, highlights)
- **Rose Dark**: `#C76A91` (hover states)
- **Muted**: `#8A7E83` (secondary text)
- **Ink**: `#2B2326` (body text)

### Admin Theme (coming soon)
- **Base**: `#161114`
- **Cards**: `#221C20`
- **Accent Pink**: `#F2A8C4`

## 🏗️ Component Architecture

### Context & State
- **Cart_Context**: Add/remove items, update quantity
- **Wishlist_Context**: Add/remove wishlist items
- Uses React Context API (no Redux needed for MVP)

### GraphQL Integration
- **Apollo Client**: Configured at `src/graphql/Apollo_Client.ts`
- **Queries**: Product listings, order history
- **Mutations**: Create order, update cart
- Mock data in place until backend is ready

### Pages
- **Homepage** (`/`): Product showcase
- **Checkout** (`/checkout`): Delivery form + payment
- **Confirmation** (`/confirmation`): Order success
- **Product Detail** (`/products/[id]`): Coming soon

## 🚀 Development Workflow

### Add a New Component

1. Create file in `src/components/Component_Name.tsx`
2. Use Capital_Case_With_Underscores naming
3. Export as named export
4. Use in pages/other components

Example:
```typescript
// src/components/Product_Card.tsx
export const Product_Card = ({ Product_Name, Price }: Props) => {
  return <div>{Product_Name}</div>;
};

// In page:
<Product_Card Product_Name="Rose Dress" Price={599} />
```

### Connect to GraphQL

1. Add query/mutation in `src/graphql/`
2. Use `useQuery` hook in component
3. Replace mock data

Example:
```typescript
const { data, loading } = useQuery(GET_PRODUCTS_QUERY, {
  variables: { Category: 'Dresses' }
});
```

### Styling with Tailwind

Use custom color classes (already configured):
```jsx
<div className="bg-Brand_Pink text-Primary_White">
  Styled component
</div>
```

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## ✨ Features

- ✅ Responsive grid (2/3/4 columns)
- ✅ Mobile hamburger menu
- ✅ Cart management (add/remove/update)
- ✅ Wishlist functionality
- ✅ Checkout form
- ✅ Order confirmation
- ⏳ Product filters (category tabs)
- ⏳ Product detail page
- ⏳ Real GraphQL integration
- ⏳ User authentication
- ⏳ Order tracking

## 🐛 Troubleshooting

### Dependencies not installing?
```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### GraphQL connection error?
Make sure `NEXT_PUBLIC_GRAPHQL_URI` is set correctly in `.env.local`

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [Tailwind CSS](https://tailwindcss.com)
- [React Context API](https://react.dev/reference/react/useContext)

## 🎯 Next Steps

1. ✅ Frontend scaffold complete
2. 🔄 Setup Backend + Database
3. 🔄 Connect GraphQL endpoints
4. 🔄 Add product filters
5. 🔄 Implement authentication
6. 🔄 Build admin dashboard

---

**Start development**: `npm install && npm run dev`
