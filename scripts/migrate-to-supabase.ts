/**
 * Migration Script: Migrate mock data to Supabase
 *
 * Run with: npx tsx scripts/migrate-to-supabase.ts
 *
 * Make sure to install tsx first: npm install -D tsx
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import { categories, products } from '../data/products';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

// Use service role key for migration (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log('🚀 Starting migration to Supabase...\n');

  try {
    // =============================================
    // Step 1: Migrate Categories
    // =============================================
    console.log('📁 Migrating categories...');

    const categoriesData = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      product_count: cat.productCount || 0
    }));

    const { data: insertedCategories, error: catError } = await supabase
      .from('categories')
      .insert(categoriesData)
      .select();

    if (catError) {
      console.error('❌ Error inserting categories:', catError.message);
      throw catError;
    }

    console.log(`✅ Inserted ${insertedCategories?.length || 0} categories`);

    // =============================================
    // Step 2: Migrate Products
    // =============================================
    console.log('\n📦 Migrating products...');

    const productsData = products.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category_id: p.category,
      description: p.description,
      specifications: p.specifications || {},
      image_url: p.image || null,
      in_stock: p.inStock ?? true,
      average_rating: p.averageRating || null,
      review_count: p.reviewCount || 0,
      tags: p.tags || []
    }));

    const { data: insertedProducts, error: prodError } = await supabase
      .from('products')
      .insert(productsData)
      .select();

    if (prodError) {
      console.error('❌ Error inserting products:', prodError.message);
      throw prodError;
    }

    console.log(`✅ Inserted ${insertedProducts?.length || 0} products`);

    // =============================================
    // Step 3: Migrate Product Prices
    // =============================================
    console.log('\n💰 Migrating product prices...');

    const pricesData = products.flatMap(p =>
      p.prices.map(price => ({
        product_id: p.id,
        merchant: price.merchant,
        price: price.price,
        currency: price.currency || 'EUR',
        url: price.url,
        shipping: price.shipping || 0,
        availability: price.availability || 'in-stock',
        last_updated: new Date().toISOString()
      }))
    );

    // Insert in batches of 50 to avoid payload limits
    const batchSize = 50;
    let totalPricesInserted = 0;

    for (let i = 0; i < pricesData.length; i += batchSize) {
      const batch = pricesData.slice(i, i + batchSize);

      const { data: insertedPrices, error: priceError } = await supabase
        .from('product_prices')
        .insert(batch)
        .select();

      if (priceError) {
        console.error(`❌ Error inserting price batch ${i / batchSize + 1}:`, priceError.message);
        throw priceError;
      }

      totalPricesInserted += insertedPrices?.length || 0;
      console.log(`   Batch ${i / batchSize + 1}: ${insertedPrices?.length || 0} prices`);
    }

    console.log(`✅ Inserted ${totalPricesInserted} total prices`);

    // =============================================
    // Verification
    // =============================================
    console.log('\n🔍 Verifying migration...');

    const { count: catCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });

    const { count: prodCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    const { count: priceCount } = await supabase
      .from('product_prices')
      .select('*', { count: 'exact', head: true });

    console.log('\n📊 Database Status:');
    console.log(`   Categories: ${catCount}`);
    console.log(`   Products: ${prodCount}`);
    console.log(`   Prices: ${priceCount}`);

    // =============================================
    // Success
    // =============================================
    console.log('\n✅ Migration completed successfully! 🎉');
    console.log('\n📌 Next steps:');
    console.log('   1. Visit your Supabase dashboard to verify the data');
    console.log('   2. Test queries in the SQL Editor');
    console.log('   3. Proceed with Phase 1.2 (Authentication)');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrate();
