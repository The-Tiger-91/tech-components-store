import * as cheerio from 'cheerio';
import { BaseScraper } from './BaseScraper';
import { ScrapedProduct } from './types';

/**
 * Scraper pour Amazon.fr
 * Note: Pour production, utilisez Amazon Product Advertising API
 */
export class AmazonScraper extends BaseScraper {
  async scrapeProduct(query: string): Promise<ScrapedProduct[]> {
    const searchUrl = `/s?k=${encodeURIComponent(query)}&__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91`;

    const response = await this.client.get(searchUrl);
    const $ = cheerio.load(response.data);
    const products: ScrapedProduct[] = [];

    // Sélecteur pour les résultats Amazon
    $('div[data-component-type="s-search-result"]').each((_, element) => {
      try {
        const $item = $(element);
        const asin = $item.attr('data-asin');
        if (!asin) return;

        const title = $item.find('h2 a span').first().text().trim();
        const priceWhole = $item.find('.a-price-whole').first().text().replace(',', '.');
        const priceFraction = $item.find('.a-price-fraction').first().text();
        const priceText = `${priceWhole}${priceFraction}`;
        const price = parseFloat(priceText);

        if (!title || !price || isNaN(price)) return;

        const imageUrl = $item.find('img.s-image').attr('src');
        const productUrl = `https://www.amazon.fr/dp/${asin}`;
        const affiliateUrl = this.generateAffiliateUrl(productUrl);

        const ratingText = $item.find('span.a-icon-alt').first().text();
        const rating = parseFloat(ratingText.split(' ')[0].replace(',', '.'));
        const reviewCountText = $item.find('span.a-size-base.s-underline-text').first().text();
        const reviewCount = parseInt(reviewCountText.replace(/\s/g, ''));

        products.push({
          externalId: asin,
          name: title,
          imageUrl: imageUrl || undefined,
          price: {
            merchant: 'Amazon',
            price: price,
            currency: 'EUR',
            url: productUrl,
            affiliateUrl: affiliateUrl,
            shipping: 0, // Amazon Prime souvent gratuit
            availability: 'in-stock',
            lastUpdated: new Date(),
          },
          rating: isNaN(rating) ? undefined : rating,
          reviewCount: isNaN(reviewCount) ? undefined : reviewCount,
        });
      } catch (error) {
        console.error('Erreur parsing produit Amazon:', error);
      }
    });

    return products.slice(0, 10); // Limiter à 10 résultats
  }
}
