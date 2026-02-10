/**
 * Types pour le système de scraping multi-marchands
 */

export interface ScrapedPrice {
  merchant: string;
  price: number;
  currency: string;
  url: string;
  affiliateUrl?: string;
  shipping: number;
  availability: 'in-stock' | 'limited' | 'out-of-stock';
  lastUpdated: Date;
}

export interface ScrapedProduct {
  externalId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  specifications?: Record<string, string>;
  price: ScrapedPrice;
  rating?: number;
  reviewCount?: number;
}

export interface ScraperConfig {
  name: string;
  baseUrl: string;
  affiliateTag?: string;
  enabled: boolean;
  rateLimit: number; // milliseconds between requests
}

export interface ScraperResult {
  success: boolean;
  products: ScrapedProduct[];
  errors?: string[];
  scrapedAt: Date;
  merchant: string;
}
