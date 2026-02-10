import { AmazonScraper } from './AmazonScraper';
import { LDLCScraper } from './LDLCScraper';
import { MaterielNetScraper } from './MaterielNetScraper';
import { ScraperConfig, ScraperResult } from './types';

/**
 * Configuration des scrapers
 * Ajoutez vos tags d'affiliation ici
 */
const scraperConfigs: Record<string, ScraperConfig> = {
  amazon: {
    name: 'Amazon',
    baseUrl: 'https://www.amazon.fr',
    affiliateTag: process.env.AMAZON_AFFILIATE_TAG, // À ajouter dans .env.local
    enabled: true,
    rateLimit: 2000, // 2 secondes entre requêtes
  },
  ldlc: {
    name: 'LDLC',
    baseUrl: 'https://www.ldlc.com',
    affiliateTag: process.env.LDLC_AFFILIATE_TAG,
    enabled: true,
    rateLimit: 3000,
  },
  materielnet: {
    name: 'Materiel.net',
    baseUrl: 'https://www.materiel.net',
    affiliateTag: process.env.MATERIELNET_AFFILIATE_TAG,
    enabled: true,
    rateLimit: 3000,
  },
};

/**
 * Initialiser tous les scrapers
 */
export function initializeScrapers() {
  return {
    amazon: new AmazonScraper(scraperConfigs.amazon),
    ldlc: new LDLCScraper(scraperConfigs.ldlc),
    materielnet: new MaterielNetScraper(scraperConfigs.materielnet),
  };
}

/**
 * Scraper tous les marchands en parallèle
 */
export async function scrapeAllMerchants(query: string): Promise<ScraperResult[]> {
  const scrapers = initializeScrapers();

  // Exécuter tous les scrapers en parallèle
  const results = await Promise.allSettled([
    scrapers.amazon.scrape(query),
    scrapers.ldlc.scrape(query),
    scrapers.materielnet.scrape(query),
  ]);

  // Extraire les résultats réussis
  return results
    .filter((result): result is PromiseFulfilledResult<ScraperResult> =>
      result.status === 'fulfilled'
    )
    .map(result => result.value);
}

/**
 * Scraper un marchant spécifique
 */
export async function scrapeMerchant(
  merchant: 'amazon' | 'ldlc' | 'materielnet',
  query: string
): Promise<ScraperResult> {
  const scrapers = initializeScrapers();
  return scrapers[merchant].scrape(query);
}
