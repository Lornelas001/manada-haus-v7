export type ProductSize = string; // libre: 'S','M','1','2','28cm'

export interface ProductCategoryItem {
  id: string;
  label: string;
  emoji?: string;
}

export interface StockEntry {
  size: string;
  qty: number;
}

export interface Rating {
  id: string;
  stars: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  sizes: string[];
  stock: StockEntry[];
  images: string[];
  inStock: boolean;
  featured: boolean;
  isPromo: boolean;
  ratings: Rating[];
}

export interface SaleRecord {
  id: string;
  productId: string;
  productName: string;
  price: number;
  size: string;
  date: string;
}
