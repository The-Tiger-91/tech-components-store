'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/products';
import { Search } from 'lucide-react';
import ProductIcon from '@/components/ProductIcon';

interface CategorySlot {
  categoryId: string;
  categoryName: string;
  icon: string;
  productName?: string;
  price?: number;
}

export default function PCBuilder() {
  const [keyword, setKeyword] = useState('');
  const [budget, setBudget] = useState('');
  const [slots, setSlots] = useState<CategorySlot[]>(
    categories.map(cat => ({
      categoryId: cat.id,
      categoryName: cat.name,
      icon: cat.icon || '📦'
    }))
  );
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!keyword || !budget) return;

    setIsSearching(true);

    // Simulation de recherche (sera remplacé par vraie logique plus tard)
    setTimeout(() => {
      // Afficher les résultats après la recherche
      setShowResults(true);
      // Pour l'instant, on laisse les slots vides
      // Plus tard, on remplira avec des produits recommandés
      setIsSearching(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Left: Form + Logo */}
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-3">
                Configurez votre PC idéal
              </h2>
              <p className="text-muted-foreground">
                Dites-nous ce que vous voulez faire et nous vous proposerons les meilleurs composants
              </p>
            </div>

            {/* Search Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Votre projet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Keyword Input */}
                <div className="space-y-2">
                  <Label htmlFor="keyword">
                    Mot-clé : nom de jeu, IA, logiciel...
                  </Label>
                  <Input
                    id="keyword"
                    type="text"
                    placeholder="Ex: Cyberpunk 2077, Stable Diffusion, Blender..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Entrez le jeu, logiciel ou type de travail que vous souhaitez réaliser
                  </p>
                </div>

                {/* Budget Input */}
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (€)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Ex: 1500"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Votre budget total pour la configuration
                  </p>
                </div>

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  className="w-full"
                  size="lg"
                  disabled={!keyword || !budget || isSearching}
                >
                  <Search className="mr-2 h-5 w-5" />
                  {isSearching ? 'Recherche en cours...' : 'Trouver ma configuration'}
                </Button>
              </CardContent>
            </Card>

            {/* Logo/Maquette + Jauge - Appears after search below the form */}
            {showResults && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Logo/Maquette */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 flex items-center justify-center">
                        <div className="text-5xl">
                          {keyword.toLowerCase().includes('far cry') && '🎮'}
                          {keyword.toLowerCase().includes('claude') && '🤖'}
                          {keyword.toLowerCase().includes('stable diffusion') && '🎨'}
                          {keyword.toLowerCase().includes('blender') && '🎬'}
                          {keyword.toLowerCase().includes('cyberpunk') && '🌃'}
                          {!keyword.toLowerCase().includes('far cry') &&
                           !keyword.toLowerCase().includes('claude') &&
                           !keyword.toLowerCase().includes('stable diffusion') &&
                           !keyword.toLowerCase().includes('blender') &&
                           !keyword.toLowerCase().includes('cyberpunk') && '💻'}
                        </div>
                      </div>
                    </div>

                    {/* Jauges et indicateurs */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="font-semibold text-lg mb-1">{keyword}</p>
                        <p className="text-xs text-muted-foreground">Budget : {budget} €</p>
                      </div>

                      {/* Jauge de puissance (pour jeux) ou rapidité (pour logiciels) */}
                      <div className="space-y-2">
                        {(keyword.toLowerCase().includes('far cry') ||
                          keyword.toLowerCase().includes('cyberpunk') ||
                          keyword.toLowerCase().includes('gta') ||
                          keyword.toLowerCase().includes('game')) ? (
                          <>
                            {/* Pour les jeux : Jauge de puissance + FPS */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Puissance</span>
                                <span className="font-semibold text-green-600">Élevée</span>
                              </div>
                              <div className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative overflow-hidden">
                                <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-background/30"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">FPS estimés :</span>
                              <span className="text-2xl font-bold text-primary">120+</span>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Pour les logiciels : Jauge de rapidité */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Rapidité</span>
                                <span className="font-semibold text-green-600">Très rapide</span>
                              </div>
                              <div className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative overflow-hidden">
                                <div className="absolute right-0 top-0 bottom-0 w-1/5 bg-background/30"></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">Performance :</span>
                              <span className="text-lg font-bold text-primary">Excellente</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            )}
          </div>

          {/* Right: Slots - Always visible */}
          <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Configuration recommandée
                </h3>

                <div className="grid gap-1.5">
                  {slots.map((slot) => (
                    <Card
                      key={slot.categoryId}
                      className={`transition-all ${
                        slot.productName
                          ? 'border-primary/50 bg-primary/5'
                          : 'border-dashed'
                      }`}
                    >
                      <CardContent className="p-2">
                        <div className="flex items-center gap-2">
                          {/* Category Icon */}
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                              <ProductIcon category={slot.categoryId} size="sm" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-medium text-xs">
                                {slot.categoryName}
                              </h4>
                              {!slot.productName && (
                                <Badge variant="outline" className="text-[10px] px-1 py-0">
                                  Vide
                                </Badge>
                              )}
                            </div>

                            {slot.productName ? (
                              <div className="flex items-center justify-between">
                                <p className="text-[11px] text-foreground truncate">
                                  {slot.productName}
                                </p>
                                <p className="text-xs font-semibold text-primary ml-2">
                                  {slot.price?.toFixed(2)} €
                                </p>
                              </div>
                            ) : (
                              <p className="text-[11px] text-muted-foreground">
                                En attente...
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Total (if products selected) */}
                {slots.some(s => s.productName) && (
                  <Card className="border-primary">
                    <CardContent className="p-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs">Total estimé</span>
                        <span className="text-lg font-bold text-primary">
                          {slots
                            .reduce((sum, slot) => sum + (slot.price || 0), 0)
                            .toFixed(2)}{' '}
                          €
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
        </div>
      </div>
    </section>
  );
}
