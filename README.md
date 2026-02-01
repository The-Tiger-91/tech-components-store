# TechComponents - Site E-commerce de Composants IA & Robotique

Site web moderne de comparaison de prix pour composants informatiques haute performance, spécialisé dans l'IA, le machine learning et la robotique.

## 🚀 Fonctionnalités

- ✅ Design minimaliste et professionnel
- ✅ Comparaison de prix en temps réel entre plusieurs marchands
- ✅ Filtrage par catégories (RAM, CPU, GPU, Cartes mères, etc.)
- ✅ Système de tri (prix, popularité, notes)
- ✅ Pages de détails produits avec spécifications complètes
- ✅ Responsive design (mobile, tablette, desktop)
- ✅ API REST pour la gestion des prix
- 🔄 Intégration avec APIs externes des marchands (en cours)

## 🛠️ Technologies Utilisées

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React

## 📦 Installation

### Prérequis

- Node.js 18+ et npm
- Git (optionnel)

### Étapes d'installation

1. Cloner ou naviguer vers le projet:
```bash
cd ~/Desktop/Projet-Dev/tech-components-store
```

2. Installer les dépendances:
```bash
npm install
```

3. Créer un fichier `.env.local` à partir de `.env.example`:
```bash
cp .env.example .env.local
```

4. Lancer le serveur de développement:
```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📁 Structure du Projet

```
tech-components-store/
├── app/                      # App Router de Next.js
│   ├── api/                  # Routes API
│   │   └── prices/          # API de gestion des prix
│   ├── products/            # Pages produits
│   │   ├── [id]/           # Page détail produit
│   │   └── page.tsx        # Liste des produits
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil
│   └── globals.css         # Styles globaux
├── components/              # Composants React
│   ├── ui/                 # Composants Shadcn/ui
│   ├── Header.tsx          # En-tête du site
│   ├── Footer.tsx          # Pied de page
│   └── ProductCard.tsx     # Carte produit
├── data/                    # Données mockées
│   └── products.ts         # Liste des produits
├── types/                   # Types TypeScript
│   └── product.ts          # Types des produits
└── lib/                     # Utilitaires
    └── utils.ts            # Fonctions utilitaires
```

## 🔌 Intégration des APIs Externes

Le site est préparé pour l'intégration avec les APIs des marchands. Voici les étapes:

### 1. Choisir vos APIs

Plusieurs options disponibles:

#### Amazon Product Advertising API
- **Documentation**: https://webservices.amazon.com/paapi5/documentation/
- **Avantages**: Données officielles Amazon, fiables
- **Limitations**: Nécessite un compte Associates, quotas stricts

#### RapidAPI
- **Documentation**: https://rapidapi.com/
- **Avantages**: Accès à plusieurs APIs (Amazon, eBay, etc.) en un seul endroit
- **APIs recommandées**:
  - Real-Time Amazon Data API
  - Product Data API
  - Price Monitoring API

#### Rainforest API
- **Documentation**: https://www.rainforestapi.com/
- **Avantages**: Scraping Amazon sans API officielle
- **Idéal pour**: Récupérer des prix Amazon rapidement

#### eBay API
- **Documentation**: https://developer.ebay.com/
- **Avantages**: Accès direct aux données eBay

### 2. Configuration

Ajouter vos clés API dans `.env.local`

### 3. Implémentation

Modifier le fichier `app/api/prices/route.ts` pour intégrer les vraies APIs.

## 🎨 Personnalisation du Design

Les couleurs et styles peuvent être modifiés dans `app/globals.css`.
Les composants UI sont dans `components/ui/`.

## 📊 API Endpoints

### GET /api/prices
Récupère les prix des produits.

### POST /api/prices
Met à jour les prix de plusieurs produits.

## 🚀 Déploiement

Déploiement recommandé sur Vercel:
```bash
npm run build
vercel --prod
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Lancer en mode développement
npm run build        # Créer le build de production
npm run start        # Lancer le serveur de production
npm run lint         # Vérifier le code avec ESLint
```

## 📝 Prochaines Étapes

- [ ] Implémenter les vraies APIs des marchands
- [ ] Ajouter un système d'authentification utilisateur
- [ ] Créer un système de favoris
- [ ] Ajouter des alertes de prix
- [ ] Implémenter un historique de prix

## 📄 Licence

MIT License - Libre d'utilisation et de modification.

---

**Développé avec ❤️ par Claude Code**
