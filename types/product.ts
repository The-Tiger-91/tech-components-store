export interface Product {
  id: string;
  name: string;
  category: 'motherboard' | 'ram' | 'cooling' | 'processor' | 'gpu' | 'storage' | 'power-supply';
  description: string;
  specifications: {
    [key: string]: string;
  };
  image: string;
  prices: ProductPrice[];
  averageRating?: number;
  reviewCount?: number;
  inStock: boolean;
  tags?: string[];
}

export interface ProductPrice {
  merchant: string;
  price: number;
  currency: string;
  url: string;
  lastUpdated: Date;
  shipping?: number;
  availability: 'in-stock' | 'limited' | 'out-of-stock';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'popular';

export interface FilterOptions {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  inStockOnly: boolean;
  merchants: string[];
}
