import * as cheerio from 'cheerio';
import { BaseScraper } from './BaseScraper';
import { ScrapedProduct } from './types';

/**
 * Scraper pour LDLC.com
 */
export class LDLCScraper extends BaseScraper {
  async scrapeProduct(query: string): Promise<ScrapedProduct[]> {
    const searchUrl = `/recherche/${encodeURIComponent(query)}/`;

    const response = await this.client.get(searchUrl);
    const $ = cheerio.load(response.data);
    const products: ScrapedProduct[] = [];

    // Sélecteur pour les résultats LDLC
    $('li.pdt-item').each((_, element) => {
      try {
        const $item = $(element);

        const title = $item.find('.title-3').text().trim();
        const priceText = $item.find('.price').text().trim();
        const price = parseFloat(priceText.replace('€', '').replace(',', '.').replace(/\s/g, ''));

        if (!title || !price || isNaN(price)) return;

        const productLink = $item.find('a.pdt-item-link').attr('href');
        const productUrl = productLink ? `https://www.ldlc.com${productLink}` : '';
        const affiliateUrl = this.generateAffiliateUrl(productUrl);

        const imageUrl = $item.find('img.lazy').attr('data-src') ||
                        $item.find('img').attr('src');

        // Extraire l'ID du produit depuis l'URL
        const productId = productLink?.match(/\/fiche\/PB(\d+)\.html/)?.[1] || '';

        // Vérifier la disponibilité
        const availability = $item.find('.stock').text().includes('En stock')
          ? 'in-stock' as const
          : 'out-of-stock' as const;

        products.push({
          externalId: `ldlc-${productId}`,
          name: title,
          imageUrl: imageUrl || undefined,
          price: {
            merchant: 'LDLC',
            price: price,
            currency: 'EUR',
            url: productUrl,
            affiliateUrl: affiliateUrl,
            shipping: price >= 100 ? 0 : 5.99, // Frais de port LDLC
            availability: availability,
            lastUpdated: new Date(),
          },
        });
      } catch (error) {
        console.error('Erreur parsing produit LDLC:', error);
      }
    });

    return products.slice(0, 10);
  }
}
