import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import ComparisonTable from '@/components/ComparisonTable';
import PCBuilder from '@/components/PCBuilder';
import { categories, products } from '@/data/products';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

export default function Home() {
  // Featured products - products with best savings or ratings
  const featuredProducts = products.slice(0, 4);

  // Group products by category for comparison tables
  const productsByCategory = categories.map(category => ({
    category,
    products: products.filter(p => p.category === category.id).slice(0, 3)
  })).filter(group => group.products.length > 0);

  return (
    <div className="flex flex-col">
      {/* PC Builder Section */}
      <PCBuilder />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              <TrendingUp className="mr-1 h-3 w-3" />
              Prix mis à jour en temps réel
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Composants IA & Robotique au{' '}
              <span className="text-primary">Meilleur Prix</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Comparez instantanément les prix de centaines de composants informatiques haute performance pour vos projets d&apos;intelligence artificielle et de robotique.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/products">
                  Explorer les produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Prix en Temps Réel</h3>
                <p className="text-sm text-muted-foreground">
                  Comparaison instantanée des prix de tous les grands marchands
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Vendeurs Vérifiés</h3>
                <p className="text-sm text-muted-foreground">
                  Seulement des marchands de confiance et certifiés
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Meilleures Offres</h3>
                <p className="text-sm text-muted-foreground">
                  Économisez jusqu&apos;à 30% sur vos achats de composants
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Explorez par Catégorie</h2>
            <p className="text-muted-foreground">
              Trouvez exactement ce dont vous avez besoin pour votre projet
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 text-4xl">{category.icon}</div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {category.productCount} produits disponibles
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Tables by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Tableaux de Comparaison par Catégorie</h2>
            <p className="text-muted-foreground">
              Comparez rapidement les specs et prix des meilleurs produits de chaque catégorie
            </p>
          </div>

          <div className="space-y-16">
            {productsByCategory.map((group) => (
              <ComparisonTable
                key={group.category.id}
                products={group.products}
                categoryName={group.category.name}
                categoryIcon={group.category.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Produits Vedettes</h2>
              <p className="text-muted-foreground">
                Les meilleures offres du moment
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">
                Voir tout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">
                Prêt à économiser sur vos composants ?
              </CardTitle>
              <CardDescription className="text-base">
                Rejoignez des milliers d&apos;utilisateurs qui font confiance à TechComponents pour leurs achats
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button size="lg" asChild>
                <Link href="/products">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
