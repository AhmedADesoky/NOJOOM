export interface Product {
  Id: string;
  Name: string;
  Price: number;
  Discount_Price?: number;
  Image_Url: string;
  Stock: number;
  Color: string;
  Description: string;
  Is_New?: boolean;
  Is_Sale?: boolean;
  Categories: string[];
}

export const CATEGORIES = [
  { Id: 'All', Label: 'All Pieces' },
  { Id: 'Dresses', Label: 'Dresses' },
  { Id: 'New', Label: 'New In' },
  { Id: 'Sale', Label: 'Sale' },
];

export const CATEGORY_TITLES: Record<string, string> = {
  All: 'All Pieces',
  Dresses: 'Dresses',
  New: 'New In',
  Sale: 'Sale',
};

export const PRODUCTS: Product[] = [
  {
    Id: '1',
    Name: 'Aurelie Slip Dress',
    Price: 1490,
    Discount_Price: 1150,
    Image_Url: 'https://images.unsplash.com/photo-1595777707802-4b9c42726a20?w=800&h=1000&fit=crop',
    Stock: 12,
    Color: 'Pink',
    Description:
      'A flowing slip dress in premium Egyptian cotton. Cut on the bias for a flattering drape, with delicate adjustable straps and a soft rose hue.',
    Is_New: true,
    Is_Sale: false,
    Categories: ['All', 'Dresses', 'New'],
  },
  {
    Id: '2',
    Name: 'Céline Midi Dress',
    Price: 1290,
    Discount_Price: 990,
    Image_Url: 'https://images.unsplash.com/photo-1595862365283-38d6b0865b47?w=800&h=1000&fit=crop',
    Stock: 7,
    Color: 'Blush',
    Description:
      'Midi-length dress with a clean silhouette and couture finishing. Breathable cotton blend, perfect for everyday elegance.',
    Is_New: false,
    Is_Sale: true,
    Categories: ['All', 'Dresses', 'Sale'],
  },
  {
    Id: '3',
    Name: 'Noor Maxi Dress',
    Price: 1150,
    Image_Url: 'https://images.unsplash.com/photo-1609708536965-52519a63a437?w=800&h=1000&fit=crop',
    Stock: 4,
    Color: 'Navy',
    Description:
      'Floor-length maxi in deep navy cotton. Timeless and versatile, designed to move with you from day to evening.',
    Is_New: false,
    Is_Sale: false,
    Categories: ['All', 'Dresses'],
  },
  {
    Id: '4',
    Name: 'Rose Silk Dress',
    Price: 1390,
    Image_Url: 'https://images.unsplash.com/photo-1595959458970-3cf5ef62fb55?w=800&h=1000&fit=crop',
    Stock: 9,
    Color: 'Rose',
    Description:
      'Silk-touch cotton dress in dusty rose. Soft structure with a refined neckline and effortless feminine lines.',
    Is_New: true,
    Is_Sale: false,
    Categories: ['All', 'Dresses', 'New'],
  },
  {
    Id: '5',
    Name: 'Soft Cotton Midi',
    Price: 1050,
    Image_Url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=1000&fit=crop',
    Stock: 15,
    Color: 'Ivory',
    Description:
      'Essential midi dress in ivory Egyptian cotton. Minimal, comfortable, and made for everyday wear.',
    Is_New: false,
    Is_Sale: false,
    Categories: ['All', 'Dresses'],
  },
  {
    Id: '6',
    Name: 'Premium Rose Maxi',
    Price: 1590,
    Discount_Price: 1190,
    Image_Url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop',
    Stock: 3,
    Color: 'Rose',
    Description:
      'Statement maxi dress with premium rose-toned fabric. Elegant drape and refined details for special occasions.',
    Is_New: false,
    Is_Sale: true,
    Categories: ['All', 'Dresses', 'Sale'],
  },
  {
    Id: '7',
    Name: 'Blush Garden Dress',
    Price: 1250,
    Image_Url: 'https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=800&h=1000&fit=crop',
    Stock: 8,
    Color: 'Blush',
    Description:
      'Garden-inspired blush dress with a relaxed fit. Lightweight cotton that flatters and breathes all day.',
    Is_New: true,
    Is_Sale: false,
    Categories: ['All', 'Dresses', 'New'],
  },
  {
    Id: '8',
    Name: 'Cotton Essence Dress',
    Price: 890,
    Discount_Price: 690,
    Image_Url: 'https://images.unsplash.com/photo-1595852211835-137a2a62ee21?w=800&h=1000&fit=crop',
    Stock: 20,
    Color: 'Pink',
    Description:
      'Everyday essential in soft pink cotton. Simple, sculpting, and designed to last season after season.',
    Is_New: false,
    Is_Sale: true,
    Categories: ['All', 'Dresses', 'Sale'],
  },
];

export const Get_Product_By_Id = (Id: string): Product | undefined =>
  PRODUCTS.find((Product) => Product.Id === Id);

export const Format_Price = (Amount: number) =>
  `LE ${Amount.toLocaleString('en-US')}`;
