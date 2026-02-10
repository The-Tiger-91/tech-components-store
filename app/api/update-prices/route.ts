import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { scrapeAllMerchants } from '@/lib/scrapers';

/**
 * API Route pour scraper ET sauvegarder les prix dans Supabase
 *
 * POST /api/update-prices
 * Body: { productId: string, searchQuery: string }
 *
 * Cette route va:
 * 1. Scraper tous les marchands
 * 2. Mettre à jour les prix dans Supabase
 * 3. Générer les liens affiliés pour chaque marchant
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, searchQuery } = body;

    if (!productId || !searchQuery) {
      return NextResponse.json(
        { error: 'productId and searchQuery are required' },
        { status: 400 }
      );
    }

    // 1. Scraper tous les marchands
    console.log(`🔍 Scraping prices for: ${searchQuery}`);
    const scraperResults = await scrapeAllMerchants(searchQuery);

    // 2. Préparer les données pour Supabase
    const supabase = await createClient();
    const pricesUpdated: any[] = [];
    const errors: string[] = [];

    for (const result of scraperResults) {
      if (!result.success || result.products.length === 0) {
        errors.push(`${result.merchant}: Aucun produit trouvé`);
        continue;
      }

      // Prendre le premier produit de chaque marchant
      const product = result.products[0];

      // 3. Upsert (insert or update) dans product_prices
      const priceData: any = {
        product_id: productId,
        merchant: product.price.merchant,
        price: product.price.price.toString(),
        currency: product.price.currency,
        url: product.price.url,
        shipping: product.price.shipping.toString(),
        availability: product.price.availability,
        last_updated: new Date().toISOString(),
      };

      // Add affiliate_url only if it's provided (column may not exist yet)
      if (product.price.affiliateUrl) {
        priceData.affiliate_url = product.price.affiliateUrl;
      }

      // Check if price already exists for this product + merchant
      const { data: existing } = await supabase
        .from('product_prices')
        .select('id')
        .eq('product_id', productId)
        .eq('merchant', product.price.merchant)
        .single();

      let data, error;

      if (existing) {
        // Update existing price
        const result = await supabase
          .from('product_prices')
          .update(priceData)
          .eq('product_id', productId)
          .eq('merchant', product.price.merchant)
          .select();
        data = result.data;
        error = result.error;
      } else {
        // Insert new price
        const result = await supabase
          .from('product_prices')
          .insert(priceData)
          .select();
        data = result.data;
        error = result.error;
      }

      if (error) {
        errors.push(`${result.merchant}: ${error.message}`);
      } else {
        pricesUpdated.push({
          merchant: product.price.merchant,
          price: product.price.price,
          url: product.price.url,
          affiliateUrl: product.price.affiliateUrl,
        });
      }
    }

    // 4. Retourner le résumé
    return NextResponse.json({
      success: true,
      productId,
      searchQuery,
      stats: {
        merchantsScraped: scraperResults.length,
        pricesUpdated: pricesUpdated.length,
        errors: errors.length,
      },
      pricesUpdated,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Error updating prices:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET version - Afficher les prix actuels d'un produit
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'productId is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: prices, error } = await supabase
      .from('product_prices')
      .select('*')
      .eq('product_id', productId)
      .order('last_updated', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      productId,
      prices,
      count: prices?.length || 0,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
