import Link from 'next/link';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getBestPrice, getSavings } from '@/data/products';
import { ExternalLink, Star, TrendingDown } from 'lucide-react';

interface ComparisonTableProps {
  products: Product[];
  categoryName: string;
  categoryIcon: string;
}

export default function ComparisonTable({ products, categoryName, categoryIcon }: ComparisonTableProps) {
  if (products.length === 0) return null;

  // Obtenir les specs communes à afficher
  const commonSpecs = products.length > 0
    ? Object.keys(products[0].specifications).slice(0, 3)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{categoryIcon}</span>
          <div>
            <h3 className="text-2xl font-bold">{categoryName}</h3>
            <p className="text-sm text-muted-foreground">
              Comparaison de {products.length} produit{products.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/products?category=${products[0].category}`}>
            Voir tout
          </Link>
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-semibold">Produit</th>
                {commonSpecs.map((spec) => (
                  <th key={spec} className="p-4 text-left font-semibold">
                    {spec}
                  </th>
                ))}
                <th className="p-4 text-left font-semibold">Note</th>
                <th className="p-4 text-left font-semibold">Meilleur Prix</th>
                <th className="p-4 text-left font-semibold">Économie</th>
                <th className="p-4 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => {
                const bestPrice = getBestPrice(product);
                const savings = getSavings(product);

                return (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <Link href={`/products/${product.id}`} className="hover:text-primary">
                        <div className="font-medium line-clamp-2 max-w-xs">
                          {product.name}
                        </div>
                        {product.tags && product.tags.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {product.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </Link>
                    </td>
                    {commonSpecs.map((spec) => (
                      <td key={spec} className="p-4 text-sm">
                        {product.specifications[spec] || '-'}
                      </td>
                    ))}
                    <td className="p-4">
                      {product.averageRating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{product.averageRating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount})
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {bestPrice && (
                        <div>
                          <div className="font-bold text-lg">
                            {bestPrice.price.toFixed(2)}€
                          </div>
                          <div className="text-xs text-muted-foreground">
                            chez {bestPrice.merchant}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {savings > 0 && (
                        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                          <TrendingDown className="h-3 w-3" />
                          -{savings.toFixed(0)}€
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" asChild>
                          <Link href={`/products/${product.id}`}>
                            Comparer
                          </Link>
                        </Button>
                        {bestPrice && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={bestPrice.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {products.map((product) => {
          const bestPrice = getBestPrice(product);
          const savings = getSavings(product);

          return (
            <Card key={product.id} className="p-4">
              <div className="space-y-3">
                <div>
                  <Link href={`/products/${product.id}`} className="hover:text-primary">
                    <h4 className="font-semibold">{product.name}</h4>
                  </Link>
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {product.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  {commonSpecs.slice(0, 2).map((spec) => (
                    <div key={spec}>
                      <div className="text-muted-foreground text-xs">{spec}</div>
                      <div className="font-medium">{product.specifications[spec]}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    {bestPrice && (
                      <div>
                        <div className="font-bold text-lg">{bestPrice.price.toFixed(2)}€</div>
                        <div className="text-xs text-muted-foreground">
                          chez {bestPrice.merchant}
                        </div>
                      </div>
                    )}
                  </div>
                  {savings > 0 && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      -{savings.toFixed(0)}€
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/products/${product.id}`}>
                      Comparer les prix
                    </Link>
                  </Button>
                  {bestPrice && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={bestPrice.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
