import axios, { AxiosInstance } from 'axios';
import { ScraperConfig, ScraperResult, ScrapedProduct } from './types';

/**
 * Classe de base abstraite pour tous les scrapers
 * Chaque marchant hérite de cette classe
 */
export abstract class BaseScraper {
  protected config: ScraperConfig;
  protected client: AxiosInstance;
  protected lastRequestTime: number = 0;

  constructor(config: ScraperConfig) {
    this.config = config;

    // Configuration Axios avec headers réalistes
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
      }
    });
  }

  /**
   * Rate limiting - Respecter les délais entre requêtes
   */
  protected async rateLimit(): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;

    if (elapsed < this.config.rateLimit) {
      await new Promise(resolve => setTimeout(resolve, this.config.rateLimit - elapsed));
    }

    this.lastRequestTime = Date.now();
  }

  /**
   * Générer un lien affilié
   */
  protected generateAffiliateUrl(url: string): string {
    if (!this.config.affiliateTag) return url;

    const urlObj = new URL(url);
    urlObj.searchParams.set('tag', this.config.affiliateTag);
    return urlObj.toString();
  }

  /**
   * Méthode abstraite - chaque scraper doit implémenter sa logique
   */
  abstract scrapeProduct(query: string): Promise<ScrapedProduct[]>;

  /**
   * Méthode publique pour scraper avec gestion d'erreurs
   */
  async scrape(query: string): Promise<ScraperResult> {
    if (!this.config.enabled) {
      return {
        success: false,
        products: [],
        errors: ['Scraper désactivé'],
        scrapedAt: new Date(),
        merchant: this.config.name,
      };
    }

    try {
      await this.rateLimit();
      const products = await this.scrapeProduct(query);

      return {
        success: true,
        products,
        scrapedAt: new Date(),
        merchant: this.config.name,
      };
    } catch (error) {
      console.error(`Erreur scraping ${this.config.name}:`, error);

      return {
        success: false,
        products: [],
        errors: [error instanceof Error ? error.message : 'Erreur inconnue'],
        scrapedAt: new Date(),
        merchant: this.config.name,
      };
    }
  }
}
