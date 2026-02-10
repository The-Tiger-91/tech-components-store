import { NextRequest, NextResponse } from 'next/server';
import { scrapeAllMerchants, scrapeMerchant } from '@/lib/scrapers';

/**
 * API Route pour scraper les prix des produits
 *
 * GET /api/scrape?q=RTX4090&merchant=all
 * GET /api/scrape?q=DDR5&merchant=amazon
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const merchant = searchParams.get('merchant') || 'all';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    let results;

    if (merchant === 'all') {
      // Scraper tous les marchands
      results = await scrapeAllMerchants(query);
    } else if (['amazon', 'ldlc', 'materielnet'].includes(merchant)) {
      // Scraper un marchant spécifique
      const result = await scrapeMerchant(
        merchant as 'amazon' | 'ldlc' | 'materielnet',
        query
      );
      results = [result];
    } else {
      return NextResponse.json(
        { error: 'Invalid merchant. Use: all, amazon, ldlc, or materielnet' },
        { status: 400 }
      );
    }

    // Agréger tous les produits
    const allProducts = results.flatMap(r => r.products);

    // Statistiques
    const stats = {
      totalProducts: allProducts.length,
      merchantsScraped: results.filter(r => r.success).length,
      merchantsFailed: results.filter(r => !r.success).length,
      scrapedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      stats,
      results,
      products: allProducts,
    });

  } catch (error) {
    console.error('Erreur API scrape:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
