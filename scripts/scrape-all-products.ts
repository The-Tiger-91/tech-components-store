/**
 * Script pour scraper les prix de tous les produits
 * Usage: npx tsx scripts/scrape-all-products.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

const PRODUCTS_TO_SCRAPE = [
  { id: '1', query: 'Corsair Vengeance DDR5 64GB 6000MHz' },
  { id: '3', query: 'Noctua NH-D15' },
  { id: '5', query: 'AMD Ryzen 9 7950X' },
  { id: '6', query: 'RTX 4090' },
  { id: '7', query: 'Samsung 990 PRO 2TB' },
];

async function main() {
  console.log('🚀 Starting price scraping for all products...\n');

  for (const product of PRODUCTS_TO_SCRAPE) {
    console.log(`\n📦 Scraping: ${product.query}`);
    console.log('━'.repeat(50));

    try {
      // Call the update-prices API
      const response = await fetch('http://localhost:3000/api/update-prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          searchQuery: product.query,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Success! Updated ${result.stats.pricesUpdated} prices`);
        result.pricesUpdated?.forEach((price: any) => {
          console.log(`   - ${price.merchant}: ${price.price}€`);
        });

        if (result.errors && result.errors.length > 0) {
          console.log(`⚠️  Errors:`);
          result.errors.forEach((error: string) => console.log(`   - ${error}`));
        }
      } else {
        console.log(`❌ Failed: ${result.error}`);
      }

      // Wait 3 seconds between products (rate limiting)
      await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
      console.error(`❌ Error scraping ${product.query}:`, error);
    }
  }

  console.log('\n\n✨ Scraping completed!');
  console.log('Check your Supabase database for updated prices.');
}

main().catch(console.error);
