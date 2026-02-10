import * as cheerio from 'cheerio';
import { BaseScraper } from './BaseScraper';
import { ScrapedProduct } from './types';

/**
 * Scraper pour Materiel.net
 */
export class MaterielNetScraper extends BaseScraper {
  async scrapeProduct(query: string): Promise<ScrapedProduct[]> {
    const searchUrl = `/recherche/${encodeURIComponent(query)}.html`;

    const response = await this.client.get(searchUrl);
    const $ = cheerio.load(response.data);
    const products: ScrapedProduct[] = [];

    // Sélecteur pour les résultats Materiel.net
    $('div.c-product').each((_, element) => {
      try {
        const $item = $(element);

        const title = $item.find('.c-product__title').text().trim();
        const priceText = $item.find('.c-product__price').text().trim();
        const price = parseFloat(priceText.replace('€', '').replace(',', '.').replace(/\s/g, ''));

        if (!title || !price || isNaN(price)) return;

        const productLink = $item.find('a.c-product__link').attr('href');
        const productUrl = productLink ? `https://www.materiel.net${productLink}` : '';
        const affiliateUrl = this.generateAffiliateUrl(productUrl);

        const imageUrl = $item.find('img.c-product__image').attr('src');

        // Extraire l'ID du produit
        const productId = productLink?.match(/\/(\d+)-/)?.[1] || '';

        // Vérifier la disponibilité
        const stockText = $item.find('.c-product__stock').text().toLowerCase();
        let availability: 'in-stock' | 'limited' | 'out-of-stock' = 'in-stock';

        if (stockText.includes('rupture') || stockText.includes('indisponible')) {
          availability = 'out-of-stock';
        } else if (stockText.includes('limité') || stockText.includes('derniers')) {
          availability = 'limited';
        }

        // Rating si disponible
        const ratingText = $item.find('.c-product__rating').attr('data-rating');
        const rating = ratingText ? parseFloat(ratingText) : undefined;

        products.push({
          externalId: `materiel-${productId}`,
          name: title,
          imageUrl: imageUrl || undefined,
          price: {
            merchant: 'Materiel.net',
            price: price,
            currency: 'EUR',
            url: productUrl,
            affiliateUrl: affiliateUrl,
            shipping: price >= 30 ? 0 : 4.99, // Frais de port Materiel.net
            availability: availability,
            lastUpdated: new Date(),
          },
          rating: rating,
        });
      } catch (error) {
        console.error('Erreur parsing produit Materiel.net:', error);
      }
    });

    return products.slice(0, 10);
  }
}
