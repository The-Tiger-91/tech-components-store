import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-xl font-bold">TC</span>
              </div>
              <div>
                <h3 className="font-bold">TechComponents</h3>
                <p className="text-xs text-muted-foreground">AI & Robotics Parts</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Votre source de confiance pour les composants informatiques haute performance.
              Comparaison de prix en temps réel pour les meilleurs rapports qualité/prix.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-foreground transition-colors">
                  Meilleures offres
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=ram" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mémoire RAM
                </Link>
              </li>
              <li>
                <Link href="/products?category=motherboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cartes Mères
                </Link>
              </li>
              <li>
                <Link href="/products?category=processor" className="text-muted-foreground hover:text-foreground transition-colors">
                  Processeurs
                </Link>
              </li>
              <li>
                <Link href="/products?category=gpu" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cartes Graphiques
                </Link>
              </li>
              <li>
                <Link href="/products?category=cooling" className="text-muted-foreground hover:text-foreground transition-colors">
                  Refroidissement
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Recevez les meilleures offres et nouveautés directement dans votre boîte mail.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="votre@email.com" className="flex-1" />
              <Button type="submit">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              En vous inscrivant, vous acceptez notre politique de confidentialité.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 TechComponents. Tous droits réservés.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Conditions d&apos;utilisation
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
