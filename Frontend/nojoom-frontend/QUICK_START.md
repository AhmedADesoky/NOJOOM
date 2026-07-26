# NOJOOM Redesign - Quick Reference

## ⚡ Quick Start (Windows)

### 1️⃣ Install Dependencies
```powershell
cd C:\NOJOOM\NOJOOM_Website\Frontend\nojoom-frontend
npm install
```

### 2️⃣ Create Environment File
```powershell
# Create .env.local
"NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql" | Out-File .env.local -Encoding UTF8
```

### 3️⃣ Start Development Server
```powershell
npm run dev
```

Visit: http://localhost:3000

---

## 📋 What's Been Created

### ✅ Components (13 files)
| Component | Purpose |
|-----------|---------|
| `Button_Primary` | Reusable button with variants |
| `Icon_Cart` | Shopping cart icon with badge |
| `Icon_Wishlist` | Heart icon for wishlist |
| `Header_Navigation` | Sticky header with logo & navigation |
| `Hero_Section` | Rose collection banner |
| `Product_Card` | Individual product card |
| `Product_Grid` | Responsive 2/3/4 column grid |
| `Category_Filter` | Category tabs filter |
| `Cart_Drawer` | Slide-in cart drawer |
| `Footer_Section` | Footer with links & newsletter |

### ✅ Contexts (3 files)
| Context | State Managed |
|---------|---------------|
| `Cart_Context` | Cart items, add/remove/update |
| `Wishlist_Context` | Wishlist items |
| `Providers` | Apollo + Cart + Wishlist |

### ✅ GraphQL (3 files)
| File | Purpose |
|------|---------|
| `Apollo_Client` | Apollo Client configuration |
| `Get_Queries` | Product & order queries |
| `Post_Mutations` | Order & cart mutations |

### ✅ Pages (3 files)
| Page | Route | Purpose |
|------|-------|---------|
| `Homepage` | `/` | Product showcase |
| `Checkout` | `/checkout` | Delivery form & payment |
| `Confirmation` | `/confirmation` | Order success |

### ✅ Configuration Files (6 files)
- `tailwind.config.ts` - Custom colors & fonts
- `app/layout.tsx` - Root layout with Google Fonts
- `app/globals.css` - Global styles & animations
- `package.json` - Dependencies updated
- `.env.example` - Environment template
- `SETUP_GUIDE.md` - Detailed setup instructions

---

## 🎨 Design Features

### Color System
```
Primary Theme (Storefront)
├── Primary White: #FFFFFF
├── Off White: #FAF6F7
├── Surface: #F2EBEE
├── Brand Pink: #E392B0 ← Main accent color
├── Rose Dark: #C76A91 ← Hover states
├── Muted: #8A7E83
└── Ink: #2B2326

Admin Theme (Coming Soon)
├── Base: #161114
├── Cards: #221C20
└── Accent Pink: #F2A8C4
```

### Typography
- **Display Font**: Cormorant Garamond (luxury, serif)
- **Body Font**: Jost (clean, geometric)
- **Arabic**: Aref Ruqaa (نجوم wordmark)

### Animations
- `animate-Fade_In`: Fade in effect
- `animate-Scale_Up`: Scale up animation
- `animate-Slide_In_Right`: Slide from right

---

## 📱 Responsive Grid

| Breakpoint | Columns |
|-----------|---------|
| Mobile   | 2       |
| Tablet   | 3       |
| Desktop  | 4       |

---

## 🏪 User Features

✅ **Shopping**
- Browse products with category filters
- Add to cart / Update quantity
- Save to wishlist
- View cart in drawer

✅ **Checkout**
- Fill delivery details
- Select payment method (Cash / InstaPay)
- Order confirmation

✅ **Design**
- Mobile-first responsive
- Smooth animations
- Rose & ivory theme
- Luxury aesthetic

---

## 🔌 API Endpoints

**Backend GraphQL API** (http://localhost:4000/graphql)

### Queries
```graphql
# Fetch products
GET_PRODUCTS_QUERY(category: String)

# Fetch single product
GET_PRODUCT_BY_ID_QUERY(id: String!)

# Fetch orders
GET_ORDERS_QUERY(customerId: String!)
```

### Mutations
```graphql
# Create order
CREATE_ORDER_MUTATION(
  customerId: String!
  items: JSON!
  total: Int!
  paymentMethod: String!
)

# Add to cart
ADD_TO_CART_MUTATION(
  productId: String!
  quantity: Int!
)
```

---

## 📦 Naming Convention

**Everything uses `Capital_Case_With_Underscores`:**

```typescript
// Variables
const Product_Name = "Dress";
const Is_In_Stock = true;
const Price_In_LE = 599;

// Functions
const Handle_Click = () => {};
const Fetch_Products = async () => {};
const Format_Price = (price) => {};

// Components
export const Product_Card = () => {};
export const Header_Navigation = () => {};

// Files
Product_Card.tsx
Header_Navigation.tsx

// Hooks
use_Cart_Context()
use_Wishlist_Context()
```

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev              # Starts on http://localhost:3000
```

### Production Build
```bash
npm run build            # Creates optimized build
npm start               # Runs production server
```

### Linting
```bash
npm run lint            # Check code quality
```

---

## ✨ Next Steps

### 1. Test Frontend (No Backend)
- Run `npm run dev`
- Should load with mock data
- Cart, wishlist should work locally

### 2. Setup Backend
- Create Node.js + Express server in `User_Backend`
- Setup Apollo Server
- Connect to Supabase database

### 3. Connect Frontend to Backend
- Update `NEXT_PUBLIC_GRAPHQL_URI` in `.env.local`
- Replace mock data in `Product_Grid` with real queries
- Test full flow: Browse → Cart → Checkout → Confirmation

### 4. Add Missing Features
- Product detail page: `/products/[id]/page.tsx`
- Order history: `/my-orders/page.tsx`
- User authentication
- Product filters with real data

### 5. Admin Dashboard
- Setup `nojoom-admin-frontend`
- Create dashboard components
- Admin GraphQL API integration

---

## 📂 File Locations

```
C:\NOJOOM\
├── NOJOOM_Website/
│   ├── Frontend/
│   │   ├── nojoom-frontend/ ← ⭐ YOU ARE HERE
│   │   │   ├── src/
│   │   │   │   ├── components/
│   │   │   │   ├── contexts/
│   │   │   │   ├── graphql/
│   │   │   │   └── assets/
│   │   │   ├── app/
│   │   │   ├── public/
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   └── SETUP_GUIDE.md
│   │   └── nojoom-admin-frontend/ ← Coming next
│   │
│   └── Backend/
│       ├── User_Backend/ ← Need to setup
│       └── Admin_Backend/ ← Need to setup
```

---

## 🆘 Troubleshooting

**Q: npm install fails?**
```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

**Q: Port 3000 busy?**
```bash
npm run dev -- -p 3001
```

**Q: GraphQL connection error?**
- Check `.env.local` exists
- Check Backend is running on port 4000
- Verify `NEXT_PUBLIC_GRAPHQL_URI` is correct

**Q: Components not showing colors?**
- Clear browser cache
- Run `npm run build` to check for errors
- Check `tailwind.config.ts` has custom colors

---

## 📞 Quick Commands

```powershell
# Setup & Run
cd C:\NOJOOM\NOJOOM_Website\Frontend\nojoom-frontend
npm install
npm run dev

# For troubleshooting
npm run build
npm run lint
npm cache clean --force

# Stop server
Ctrl + C
```

---

**Status**: ✅ Frontend Ready | ⏳ Awaiting Backend Integration

For detailed setup, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)
