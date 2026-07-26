export interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  items: number;
  total: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  image: string;
}

export const STATS = {
  revenue: 284_600,
  orders: 312,
  customers: 1_840,
  products: 48,
  revenueChange: +18.4,
  ordersChange: +12.1,
  customersChange: +9.3,
  productsChange: +4.2,
};

export const ORDERS: Order[] = [
  { id: '#7821', customer: 'Layla Hassan',   date: '24 Jul 2026', status: 'Delivered',  items: 2, total: 2980 },
  { id: '#7820', customer: 'Sara Mostafa',   date: '23 Jul 2026', status: 'Processing', items: 1, total: 1490 },
  { id: '#7819', customer: 'Nour Ibrahim',   date: '23 Jul 2026', status: 'Shipped',    items: 3, total: 4120 },
  { id: '#7818', customer: 'Dina Khalil',    date: '22 Jul 2026', status: 'Delivered',  items: 1, total: 890  },
  { id: '#7817', customer: 'Mariam Fares',   date: '22 Jul 2026', status: 'Cancelled',  items: 2, total: 2100 },
  { id: '#7816', customer: 'Hana Salah',     date: '21 Jul 2026', status: 'Delivered',  items: 1, total: 1490 },
  { id: '#7815', customer: 'Rania Adel',     date: '21 Jul 2026', status: 'Processing', items: 4, total: 5600 },
  { id: '#7814', customer: 'Yasmine Nabil',  date: '20 Jul 2026', status: 'Delivered',  items: 2, total: 2250 },
  { id: '#7813', customer: 'Mona Samir',     date: '20 Jul 2026', status: 'Shipped',    items: 1, total: 790  },
  { id: '#7812', customer: 'Farah Gamal',    date: '19 Jul 2026', status: 'Delivered',  items: 3, total: 3870 },
  { id: '#7811', customer: 'Aya Tamer',      date: '19 Jul 2026', status: 'Delivered',  items: 1, total: 1150 },
  { id: '#7810', customer: 'Salma Wael',     date: '18 Jul 2026', status: 'Processing', items: 2, total: 1980 },
];

export const PRODUCTS: Product[] = [
  { id: '1', name: 'Aurelie Slip Dress',      category: 'Dresses',  price: 1490, stock: 12, sales: 94,  image: 'https://images.unsplash.com/photo-1595777707802-4b9c42726a20?w=120&h=160&fit=crop' },
  { id: '2', name: 'Celine Linen Set',        category: 'Sets',     price: 1890, stock: 8,  sales: 71,  image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=120&h=160&fit=crop' },
  { id: '3', name: 'Isla Ruched Midi',        category: 'Dresses',  price: 1290, stock: 20, sales: 112, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=120&h=160&fit=crop' },
  { id: '4', name: 'Mila Wrap Blouse',        category: 'Tops',     price: 790,  stock: 0,  sales: 58,  image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=120&h=160&fit=crop' },
  { id: '5', name: 'Nour Pleated Skirt',      category: 'Skirts',   price: 890,  stock: 15, sales: 83,  image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=120&h=160&fit=crop' },
  { id: '6', name: 'Rania Embroidered Caftan',category: 'Caftans',  price: 2490, stock: 5,  sales: 37,  image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=120&h=160&fit=crop' },
  { id: '7', name: 'Lara Silk Cami',          category: 'Tops',     price: 690,  stock: 22, sales: 145, image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=120&h=160&fit=crop' },
  { id: '8', name: 'Dina Balloon Sleeve Dress',category: 'Dresses', price: 1750, stock: 9,  sales: 62,  image: 'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=120&h=160&fit=crop' },
];

export const MONTHLY_REVENUE = [
  { month: 'Jan', value: 18200 },
  { month: 'Feb', value: 22400 },
  { month: 'Mar', value: 19800 },
  { month: 'Apr', value: 26100 },
  { month: 'May', value: 31400 },
  { month: 'Jun', value: 28700 },
  { month: 'Jul', value: 35200 },
];

export function formatEGP(n: number) {
  return `EGP ${n.toLocaleString('en-EG')}`;
}
