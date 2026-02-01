# 🚀 Plan TechComponents - MVP E-commerce

**Date de début:** 2026-02-01
**Objectif:** Transformer le comparateur de prix en e-commerce fonctionnel
**Durée estimée:** 10-14 jours

---

## 📊 Progression Globale

**Phase 0:** ⬜️⬜️⬜️ 0/3 tâches (0%)
**Phase 1:** ⬜️⬜️⬜️ 0/3 tâches (0%)
**Phase 2:** ⬜️⬜️⬜️ 0/3 tâches (0%)

**Total:** 0/9 tâches complétées (0%)

---

## 🎯 État Actuel du Projet

### ✅ Ce qui fonctionne
- Pages catalogue et détails produits
- Filtrage par catégorie et tri
- Comparaison de prix entre marchands
- Design responsive (Tailwind CSS v4)
- 8 produits mockés avec données complètes

### ❌ Problèmes critiques
- **Bugs:** 6 erreurs ESLint (unescaped entities) + 3 variables inutilisées
- **Fonctionnalités manquantes:** Panier (0%), Checkout (0%), Auth (0%), BDD (0%)
- **Pages cassées:** 7 liens morts (/deals, /about, /contact, /faq, /privacy, /terms, /cookies)
- **Sécurité:** XSS potentiel, pas d'auth sur API POST, pas de CSRF
- **Code:** Duplication star rating (3x), emojis (4x), recherche non-fonctionnelle

**Score production-ready:** 4/10 ❌

---

## 📋 PHASE 0 : Corrections Rapides (1-2 jours)

**Objectif:** Code propre sans bugs bloquants

### 0.1 Corrections ESLint et nettoyage
- [ ] Échapper apostrophes dans `app/page.tsx` (lignes 35, 85, 182)
- [ ] Échapper apostrophes dans `app/products/[id]/page.tsx` (lignes 144, 244)
- [ ] Échapper apostrophe dans `components/Footer.tsx` (ligne 143)
- [ ] Supprimer import `Menu` inutilisé dans `components/Header.tsx` (ligne 14)
- [ ] Préfixer variables inutilisées dans `app/api/prices/route.ts` (lignes 70-71)
- [ ] Vérifier : `npm run lint` → 0 erreur
- [ ] Vérifier : `npm run build` → Succès

**Notes:**
```
Statut: ⬜️ Non commencé
Durée réelle: -
Problèmes rencontrés: -
```

---

### 0.2 Déduplication code
- [ ] Créer `components/StarRating.tsx`
- [ ] Créer `components/ProductIcon.tsx`
- [ ] Modifier `components/ProductCard.tsx` pour utiliser nouveaux composants
- [ ] Modifier `app/products/[id]/page.tsx` pour utiliser nouveaux composants
- [ ] Modifier `components/ComparisonTable.tsx` pour utiliser StarRating
- [ ] Vérifier : Affichage identique visuellement

**Notes:**
```
Statut: ⬜️ Non commencé
Durée réelle: -
Problèmes rencontrés: -
```

---

### 0.3 Recherche fonctionnelle
- [ ] Modifier `components/Header.tsx` - Ajouter handleSearch avec useRouter
- [ ] Modifier `app/products/page.tsx` - Ajouter filtre par searchParams
- [ ] Vérifier : Recherche "DDR5" redirige et filtre correctement

**Notes:**
```
Statut: ⬜️ Non commencé
Durée réelle: -
Problèmes rencontrés: -
```

---

## 📋 PHASE 1 : Fondations (4-6 jours)

**Objectif:** Supabase + Auth + Migration données vers BDD

### 1.1 Configuration Supabase
- [ ] Créer projet sur supabase.com
- [ ] Récupérer `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Installer : `npm install @supabase/supabase-js @supabase/ssr`
- [ ] Créer `lib/supabase/client.ts`
- [ ] Créer `lib/supabase/server.ts`
- [ ] Créer `.env.local` avec variables Supabase
- [ ] Exécuter SQL pour créer tables (categories, products, product_prices, user_profiles, carts, cart_items)
- [ ] Créer `scripts/migrate-to-supabase.ts`
- [ ] Exécuter migration : 6 catégories + 8 produits + ~30 prix
- [ ] Vérifier : Dashboard Supabase montre toutes les données

**Notes:**
```
Statut: ⬜️ Non commencé
Durée réelle: -
Projet Supabase: -
Problèmes rencontrés: -
```

**SQL Schema:**
```sql
-- Voir plan détaillé pour le schema complet
-- Tables: categories, products, product_prices, user_profiles, carts, cart_items
```

---

### 1.2 Authentification NextAuth + Supabase
- [ ] Installer : `npm install next-auth@beta @auth/supabase-adapter`
- [ ] Créer `auth.ts` avec configuration NextAuth
- [ ] Créer `app/api/auth/[...nextauth]/route.ts`
- [ ] Créer `middleware.ts` pour protection routes
- [ ] Créer `app/(auth)/login/page.tsx`
- [ ] Créer `app/(auth)/register/page.tsx`
- [ ] Créer `app/(auth)/layout.tsx`
- [ ] Modifier `components/Header.tsx` - Bouton Connexion → Dropdown avec avatar
- [ ] Modifier `app/layout.tsx` - Ajouter SessionProvider si nécessaire
- [ ] Vérifier : Inscription crée user dans Supabase Auth
- [ ] Vérifier : Connexion/Déconnexion fonctionne
- [ ] Vérifier : Session persiste après refresh
- [ ] Vérifier : Routes `/account/*` redirigent vers `/login`

**Notes:**
```
Statut: ⬜️ Non commencé
Durée réelle: -
Problèmes rencontrés: -
```

---

### 1.3 Migration API vers Supabase
- [ ] Créer `app/api/products/route.ts` - GET liste avec filtres
- [ ] Créer `app/api/products/[id]/route.ts` - GET détail
- [ ] Créer `app/api/categories/route.ts` - GET catégories
- [ ] Modifier `app/products/page.tsx` - Fetch depuis API
- [ ] Modifier `app/products/[id]/page.tsx` - Fetch depuis API
- [ ] Modifier `app/page.tsx` - Fetch depuis API
- [ ] Vérifier : Toutes pages affichent données depuis Supabase
- [ ] Vérifier : Filtres et recherche fonctionnent
- [ ] Vérifier : Performance < 300ms

**Notes:**
```
Statut: ⬜️ Non commencé
Durée réelle: -
Problèmes rencontrés: -
```

---

## 📋 PHASE 2 : E-commerce Core (5-7 jours)

**Objectif:** Panier + Checkout + Paiement Stripe

### 2.1 Système de Panier
- [ ] Installer : `npm install sonner`
- [ ] Créer `contexts/CartContext.tsx` - State global
- [ ] Créer `hooks/useCart.ts`
- [ ] Créer `app/api/cart/route.ts` - GET, POST, DELETE
- [ ] Créer `app/api/cart/[itemId]/route.ts` - PATCH, DELETE
- [ ] Créer `components/cart/AddToCartButton.tsx`
- [ ] Créer `components/cart/CartDrawer.tsx` - Sidebar avec Sheet
- [ ] Créer `components/cart/CartItemCard.tsx`
- [ ] Créer `app/cart/page.tsx`
- [ ] Modifier `components/Header.tsx` - Badge count + onClick CartDrawer
- [ ] Modifier `app/products/[id]/page.tsx` - Ajouter boutons "Ajouter au panier"
- [ ] Modifier `app/layout.tsx` - Wrap CartProvider
- [ ] Vérifier : Ajout panier fonctionne (connecté + anonyme)
- [ ] Vérifier : Badge Header affiche count correct
- [ ] Vérifier : Modification quantité met à jour total
- [ ] Vérifier : Panier persiste après refresh (DB si connecté, LocalStorage si anonyme)
- [ ] Vérifier : Connexion merge LocalStorage + DB

**Notes:**
```
Statut: ⬜️ Non commencé
Durée réelle: -
Problèmes rencontrés: -
```

---

### 2.2 Checkout Flow
- [ ] Exécuter SQL pour créer tables (orders, order_items)
- [ ] Installer : `npm install react-hook-form @hookform/resolvers/zod zod`
- [ ] Créer `app/checkout/page.tsx` - Multi-step form
- [ ] Créer `components/checkout/StepIndicator.tsx`
- [ ] Créer `components/checkout/ShippingForm.tsx` avec validation Zod
- [ ] Créer `components/checkout/PaymentForm.tsx`
- [ ] Créer `components/checkout/OrderSummary.tsx`
- [ ] Créer `app/checkout/success/page.tsx`
- [ ] Créer `app/checkout/cancel/page.tsx`
- [ ] Créer `app/api/orders/route.ts` - POST create order
- [ ] Créer `app/api/orders/[id]/route.ts` - GET detail
- [ ] Vérifier : Flow 3 étapes fonctionne
- [ ] Vérifier : Validation formulaires (zod)
- [ ] Vérifier : Création order en DB
- [ ] Vérifier : Redirection success après paiement

**Notes:**
```
Statut: ⬜️ Non commencé
Durée réelle: -
Problèmes rencontrés: -
```

---

### 2.3 Intégration Paiement Stripe
- [ ] Créer compte Stripe et récupérer clés Test
- [ ] Installer : `npm install stripe @stripe/stripe-js @stripe/react-stripe-js`
- [ ] Créer `lib/stripe.ts` - Client Stripe serveur
- [ ] Créer `app/api/checkout/route.ts` - Create Payment Intent
- [ ] Créer `app/api/webhooks/stripe/route.ts` - Webhook handler
- [ ] Modifier `components/checkout/PaymentForm.tsx` - Ajouter Stripe Elements
- [ ] Ajouter variables ENV : STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET
- [ ] Configurer Webhook sur Dashboard Stripe
- [ ] Ajouter bannière "Mode Test" sur checkout
- [ ] Vérifier : Payment Intent créé
- [ ] Vérifier : Carte test 4242 4242 4242 4242 fonctionne
- [ ] Vérifier : Webhook met à jour orders.status = 'paid'
- [ ] Vérifier : Redirection vers /checkout/success
- [ ] Vérifier : Order visible dans Supabase avec payment_intent_id

**Notes:**
```
Statut: ⬜️ Non commencé
Durée réelle: -
Compte Stripe: -
Problèmes rencontrés: -
```

---

## ✅ Test End-to-End Complet

### Navigation & Recherche
- [ ] Rechercher "DDR5" → Filtre produits
- [ ] Cliquer catégorie → Filtre par catégorie
- [ ] Tri par prix → Ordre correct

### Authentification
- [ ] S'inscrire → User créé dans Supabase Auth
- [ ] Se connecter → Session active
- [ ] Se déconnecter → Redirection

### Panier
- [ ] Ajouter produit → Badge Header +1
- [ ] Ouvrir drawer → Voir produit
- [ ] Modifier quantité → Total recalculé
- [ ] Anonyme → LocalStorage persiste après refresh
- [ ] Connecté → DB persiste après refresh

### Checkout
- [ ] Panier → Cliquer "Commander"
- [ ] Étape 1 : Remplir adresse → Validation OK
- [ ] Étape 2 : Stripe Elements affiché
- [ ] Carte test 4242 4242 4242 4242 → Paiement réussi
- [ ] Redirection /checkout/success

### Base de Données
- [ ] Order créé avec status = 'paid'
- [ ] Order_items créés
- [ ] Panier vidé après commande

### Performance
- [ ] Lighthouse Performance > 80
- [ ] Aucune erreur console
- [ ] `npm run lint` → 0 erreur
- [ ] `npm run build` → Succès

---

## 📦 Stack Technique Finale

**Frontend:**
- Next.js 16.1.6 (App Router)
- TypeScript 5 (strict mode)
- Tailwind CSS v4
- Shadcn/ui (Radix UI)
- React Hook Form + Zod

**Backend:**
- Next.js API Routes
- Supabase (PostgreSQL hébergé)
- Supabase Auth
- NextAuth.js v5

**Paiement:**
- Stripe (mode test)

**Déploiement:**
- Vercel (recommandé)

---

## 🔗 Ressources

- **Supabase:** https://supabase.com
- **Stripe Test Cards:** https://stripe.com/docs/testing
- **NextAuth.js:** https://authjs.dev
- **Plan détaillé:** `/Users/dhafer/.claude/plans/snazzy-cuddling-rose.md`

---

## 📝 Notes Globales

### Problèmes Rencontrés
- Aucun pour le moment

### Décisions Techniques
- Base de données : Supabase (PostgreSQL hébergé) ✅
- Authentification : NextAuth.js v5 + Supabase Auth ✅
- Paiement : Stripe mode test ✅

### Prochaines Étapes (Post-MVP)
- Pages manquantes (deals, about, contact, faq, privacy, terms, cookies)
- Admin dashboard
- Optimisations performance
- Tests unitaires/E2E
- Monitoring (Sentry)
- Emails transactionnels

---

**Dernière mise à jour:** 2026-02-01 - Plan créé ✅
