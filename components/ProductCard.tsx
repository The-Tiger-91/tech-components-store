import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { getBestPrice, getSavings } from '@/data/products';
import { TrendingDown, ExternalLink } from 'lucide-react';
import StarRating from '@/components/StarRating';
import ProductIcon from '@/components/ProductIcon';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const bestPrice = getBestPrice(product);
  const savings = getSavings(product);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            {/* Placeholder for product image */}
            <div className="flex h-full w-full items-center justify-center">
              <ProductIcon category={product.category} />
            </div>

            {/* Savings Badge */}
            {savings > 0 && (
              <div className="absolute top-2 right-2">
                <Badge variant="destructive" className="flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -{savings.toFixed(0)}€
                </Badge>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4">
        <Link href={`/products/${product.id}`} className="group-hover:text-primary transition-colors">
          <h3 className="font-semibold line-clamp-2 mb-2">{product.name}</h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Rating */}
        {product.averageRating && (
          <div className="mb-3">
            <StarRating
              rating={product.averageRating}
              reviewCount={product.reviewCount}
            />
          </div>
        )}

        {/* Best Price */}
        {bestPrice && (
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {bestPrice.price.toFixed(2)}€
              </span>
              {bestPrice.shipping === 0 && (
                <Badge variant="outline" className="text-xs">
                  Livraison gratuite
                </Badge>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              Meilleur prix chez <span className="font-medium">{bestPrice.merchant}</span>
            </div>

            {product.prices.length > 1 && (
              <div className="text-xs text-muted-foreground">
                + {product.prices.length - 1} autre{product.prices.length > 2 ? 's' : ''} offre{product.prices.length > 2 ? 's' : ''}
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild className="flex-1">
          <Link href={`/products/${product.id}`}>
            Comparer les prix
          </Link>
        </Button>
        {bestPrice && (
          <Button variant="outline" size="icon" asChild>
            <a href={bestPrice.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
