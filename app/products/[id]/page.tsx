import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import {
  Star,
  ExternalLink,
  TrendingDown,
  Package,
  Truck,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { getBestPrice, getSavings } from '@/data/products';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const bestPrice = getBestPrice(product);
  const savings = getSavings(product);

  // Related products (same category)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/products">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour aux produits
          </Link>
        </Button>
      </div>

      {/* Product Detail */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div>
          <Card className="overflow-hidden">
            <div className="relative aspect-square bg-muted flex items-center justify-center">
              <div className="text-9xl">
                {product.category === 'ram' && '💾'}
                {product.category === 'motherboard' && '🔲'}
                {product.category === 'cooling' && '❄️'}
                {product.category === 'processor' && '⚡'}
                {product.category === 'gpu' && '🎮'}
                {product.category === 'storage' && '💿'}
              </div>
            </div>
          </Card>

          {/* Product Info Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">En stock</span>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Livraison rapide</span>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Garanti 2 ans</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              {product.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mb-3 text-3xl font-bold">{product.name}</h1>

            {product.averageRating && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.averageRating!)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">
                    {product.averageRating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviewCount} avis
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Best Price */}
          {bestPrice && savings > 0 && (
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">
                    Économisez jusqu'à {savings.toFixed(2)}€
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  En comparant tous les marchands disponibles
                </p>
              </CardContent>
            </Card>
          )}

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Spécifications Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b pb-3 last:border-0"
                  >
                    <dt className="font-medium text-muted-foreground">{key}</dt>
                    <dd className="text-right font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Price Comparison */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Comparaison des Prix</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {product.prices
            .sort((a, b) => {
              const aTotal = a.price + (a.shipping || 0);
              const bTotal = b.price + (b.shipping || 0);
              return aTotal - bTotal;
            })
            .map((priceInfo, index) => (
              <Card
                key={priceInfo.merchant}
                className={
                  index === 0
                    ? 'border-2 border-primary shadow-lg'
                    : ''
                }
              >
                <CardContent className="p-6">
                  {index === 0 && (
                    <Badge className="mb-3">Meilleure offre</Badge>
                  )}

                  <div className="mb-4">
                    <h3 className="mb-1 text-lg font-bold">
                      {priceInfo.merchant}
                    </h3>
                    <Badge
                      variant={
                        priceInfo.availability === 'in-stock'
                          ? 'default'
                          : priceInfo.availability === 'limited'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className="text-xs"
                    >
                      {priceInfo.availability === 'in-stock' && 'En stock'}
                      {priceInfo.availability === 'limited' && 'Stock limité'}
                      {priceInfo.availability === 'out-of-stock' &&
                        'Rupture de stock'}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="mb-1 text-3xl font-bold">
                      {priceInfo.price.toFixed(2)}€
                    </div>
                    {priceInfo.shipping !== undefined && (
                      <p className="text-sm text-muted-foreground">
                        {priceInfo.shipping === 0
                          ? 'Livraison gratuite'
                          : `+ ${priceInfo.shipping.toFixed(2)}€ livraison`}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Total:{' '}
                      {(priceInfo.price + (priceInfo.shipping || 0)).toFixed(2)}€
                    </p>
                  </div>

                  <Button asChild className="w-full">
                    <a
                      href={priceInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir l'offre
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Produits Similaires</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
