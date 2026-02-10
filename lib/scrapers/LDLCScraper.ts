import * as cheerio from 'cheerio';
import { BaseScraper } from './BaseScraper';
import { ScrapedProduct } from './types';

/**
 * Scraper pour LDLC.com - Version robuste
 */
export class LDLCScraper extends BaseScraper {
  async scrapeProduct(query: string): Promise<ScrapedProduct[]> {
    const searchUrl = `/recherche/${encodeURIComponent(query)}/`;

    const response = await this.client.get(searchUrl);
    const $ = cheerio.load(response.data);
    const products: ScrapedProduct[] = [];

    // Essayer plusieurs sélecteurs possibles (le HTML change souvent)
    const productSelectors = [
      'li.pdt-item',
      '.listing-product',
      'article[data-id]',
      '.product-item'
    ];

    let foundProducts = false;

    for (const selector of productSelectors) {
      const $items = $(selector);
      if ($items.length > 0) {
        foundProducts = true;

        $items.each((_, element) => {
          try {
            const $item = $(element);

            // Chercher le titre avec plusieurs sélecteurs
            const title = $item.find('.title-3, .pdt-desc, h3, .product-name').first().text().trim();

            // Chercher le prix avec plusieurs sélecteurs et formattages
            const priceText = $item.find('.price, .prix, [class*="price"]').first().text().trim();
            const cleanPrice = priceText
              .replace(/€/g, '')
              .replace(/EUR/g, '')
              .replace(/\s/g, '')
              .replace(',', '.');
            const price = parseFloat(cleanPrice);

            if (!title || !price || isNaN(price)) return;

            // Chercher le lien produit
            const productLink = $item.find('a').first().attr('href');
            const productUrl = productLink?.startsWith('http')
              ? productLink
              : productLink ? `https://www.ldlc.com${productLink}` : '';

            const affiliateUrl = this.generateAffiliateUrl(productUrl);

            // Chercher l'image
            const imageUrl = $item.find('img').attr('data-src') ||
                            $item.find('img').attr('src');

            // Extraire l'ID
            const productId = productLink?.match(/PB(\d+)/)?.[1] ||
                            $item.attr('data-id') ||
                            Date.now().toString();

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
                shipping: price >= 100 ? 0 : 5.99,
                availability: 'in-stock',
                lastUpdated: new Date(),
              },
            });
          } catch (error) {
            // Continue si un produit échoue
          }
        });

        break; // On a trouvé des produits, pas besoin d'essayer les autres sélecteurs
      }
    }

    if (!foundProducts) {
      console.warn('LDLC: Aucun produit trouvé avec les sélecteurs connus');
    }

    return products.slice(0, 10);
  }
}
