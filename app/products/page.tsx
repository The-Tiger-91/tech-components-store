'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { SlidersHorizontal, X } from 'lucide-react';
import { SortOption } from '@/types/product';
import { getBestPrice } from '@/data/products';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(true);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      const aPrice = getBestPrice(a);
      const bPrice = getBestPrice(b);

      switch (sortBy) {
        case 'price-asc':
          return (aPrice?.price || 0) - (bPrice?.price || 0);
        case 'price-desc':
          return (bPrice?.price || 0) - (aPrice?.price || 0);
        case 'rating':
          return (b.averageRating || 0) - (a.averageRating || 0);
        case 'popular':
        default:
          return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategories, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Tous les Produits</h1>
        <p className="text-muted-foreground">
          {filteredAndSortedProducts.length} produit{filteredAndSortedProducts.length > 1 ? 's' : ''} trouvé{filteredAndSortedProducts.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside
          className={`lg:w-64 ${
            showFilters ? 'block' : 'hidden lg:block'
          }`}
        >
          <Card className="sticky top-24 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold">Filtres</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                disabled={selectedCategories.length === 0}
              >
                Réinitialiser
              </Button>
            </div>

            {/* Categories Filter */}
            <div className="space-y-4">
              <div>
                <h3 className="mb-3 text-sm font-medium">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-muted"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-2xl">{category.icon}</span>
                      <span className="flex-1 text-sm">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {
                          products.filter((p) => p.category === category.id)
                            .length
                        }
                      </Badge>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtres
              </Button>

              {selectedCategories.map((catId) => {
                const category = categories.find((c) => c.id === catId);
                return (
                  <Badge
                    key={catId}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => toggleCategory(catId)}
                  >
                    {category?.icon} {category?.name}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                );
              })}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Trier par:</span>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popularité</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                Aucun produit ne correspond à vos critères.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={clearFilters}
              >
                Réinitialiser les filtres
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Chargement...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
