import * as cheerio from 'cheerio';
import { BaseScraper } from './BaseScraper';
import { ScrapedProduct } from './types';

/**
 * Scraper pour Materiel.net - Version robuste
 */
export class MaterielNetScraper extends BaseScraper {
  async scrapeProduct(query: string): Promise<ScrapedProduct[]> {
    const searchUrl = `/recherche/${encodeURIComponent(query)}.html`;

    const response = await this.client.get(searchUrl);
    const $ = cheerio.load(response.data);
    const products: ScrapedProduct[] = [];

    // Essayer plusieurs sélecteurs
    const productSelectors = [
      'div.c-product',
      '.ProductCard',
      'article[data-product-id]',
      '[class*="product-item"]'
    ];

    let foundProducts = false;

    for (const selector of productSelectors) {
      const $items = $(selector);
      if ($items.length > 0) {
        foundProducts = true;

        $items.each((_, element) => {
          try {
            const $item = $(element);

            // Titre avec sélecteurs multiples
            const title = $item.find('.c-product__title, h3, .product-name, [class*="title"]')
              .first()
              .text()
              .trim();

            // Prix avec nettoyage robuste
            const priceText = $item.find('.c-product__price, .price, [class*="price"]')
              .first()
              .text()
              .trim();

            const cleanPrice = priceText
              .replace(/€/g, '')
              .replace(/EUR/g, '')
              .replace(/\s/g, '')
              .replace(',', '.');
            const price = parseFloat(cleanPrice);

            if (!title || !price || isNaN(price)) return;

            // Lien produit
            const productLink = $item.find('a').first().attr('href');
            const productUrl = productLink?.startsWith('http')
              ? productLink
              : productLink ? `https://www.materiel.net${productLink}` : '';

            const affiliateUrl = this.generateAffiliateUrl(productUrl);

            // Image
            const imageUrl = $item.find('img').attr('data-src') ||
                            $item.find('img').attr('src');

            // ID produit
            const productId = productLink?.match(/\/(\d+)-/)?.[1] ||
                            $item.attr('data-product-id') ||
                            Date.now().toString();

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
                shipping: price >= 30 ? 0 : 4.99,
                availability: 'in-stock',
                lastUpdated: new Date(),
              },
            });
          } catch (error) {
            // Continue
          }
        });

        break;
      }
    }

    if (!foundProducts) {
      console.warn('Materiel.net: Aucun produit trouvé avec les sélecteurs connus');
    }

    return products.slice(0, 10);
  }
}
