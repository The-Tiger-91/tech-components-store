import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';
import { ProductPrice } from '@/types/product';

/**
 * GET /api/prices
 * Récupère les prix en temps réel pour un ou plusieurs produits
 *
 * Query params:
 * - productId: ID du produit (optionnel)
 * - refresh: Force la mise à jour des prix (optionnel)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get('productId');
  const refresh = searchParams.get('refresh') === 'true';

  try {
    if (productId) {
      // Récupérer les prix d'un produit spécifique
      const product = products.find((p) => p.id === productId);

      if (!product) {
        return NextResponse.json(
          { error: 'Produit non trouvé' },
          { status: 404 }
        );
      }

      // Si refresh est demandé, on simulerait ici l'appel aux APIs externes
      // Pour l'instant, on retourne les données mockées
      const prices = refresh
        ? await fetchRealTimePrices(product.name, product.category)
        : product.prices;

      return NextResponse.json({
        productId: product.id,
        productName: product.name,
        prices,
        lastUpdated: new Date().toISOString(),
      });
    } else {
      // Récupérer tous les prix
      const allPrices = products.map((product) => ({
        productId: product.id,
        productName: product.name,
        prices: product.prices,
        bestPrice: Math.min(...product.prices.map((p) => p.price + (p.shipping || 0))),
      }));

      return NextResponse.json({
        prices: allPrices,
        lastUpdated: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des prix:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des prix' },
      { status: 500 }
    );
  }
}

/**
 * Fonction pour récupérer les prix en temps réel depuis les APIs externes
 * Cette fonction sera implémentée avec les vraies APIs des marchands
 */
async function fetchRealTimePrices(
  productName: string,
  category: string
): Promise<ProductPrice[]> {
  // TODO: Implémenter l'intégration avec les APIs externes
  // Exemples d'APIs à intégrer:
  // - Amazon Product Advertising API
  // - eBay API
  // - RapidAPI Product Data API
  // - Rainforest API

  // Pour l'instant, on simule un délai et on retourne des prix mockés
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simuler des variations de prix
  const merchants = ['Amazon', 'LDLC', 'Materiel.net', 'TopAchat'];
  const basePrice = Math.random() * 500 + 100;

  return merchants.map((merchant, index) => ({
    merchant,
    price: Number((basePrice + Math.random() * 50 - 25).toFixed(2)),
    currency: 'EUR',
    url: `https://${merchant.toLowerCase().replace('.', '')}.com`,
    lastUpdated: new Date(),
    shipping: index % 2 === 0 ? 0 : Number((Math.random() * 10).toFixed(2)),
    availability: (index < 2 ? 'in-stock' : 'limited') as 'in-stock' | 'limited' | 'out-of-stock',
  }));
}

/**
 * POST /api/prices
 * Déclenche une mise à jour des prix pour un ou plusieurs produits
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productIds } = body;

    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: 'productIds doit être un tableau' },
        { status: 400 }
      );
    }

    // Simuler la mise à jour des prix
    const updatedProducts = await Promise.all(
      productIds.map(async (id) => {
        const product = products.find((p) => p.id === id);
        if (!product) return null;

        const newPrices = await fetchRealTimePrices(product.name, product.category);

        return {
          productId: id,
          productName: product.name,
          prices: newPrices,
          updated: true,
        };
      })
    );

    return NextResponse.json({
      success: true,
      updated: updatedProducts.filter((p) => p !== null),
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des prix:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la mise à jour des prix' },
      { status: 500 }
    );
  }
}
