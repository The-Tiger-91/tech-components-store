# Guide d'Intégration des APIs de Prix

Ce document explique comment intégrer les APIs réelles des marchands pour récupérer les prix en temps réel.

## 🔑 APIs Recommandées

### 1. RapidAPI (Solution Tout-en-Un)

**Avantages:** Accès à plusieurs APIs en un seul compte

**APIs disponibles:**
- Real-Time Amazon Data
- eBay Product Search
- AliExpress Product Search

**Setup:**
1. Créer un compte sur https://rapidapi.com
2. S'abonner aux APIs souhaitées
3. Copier votre clé API

```typescript
// Exemple d'utilisation
const response = await fetch('https://real-time-amazon-data.p.rapidapi.com/search', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
    'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
  },
  params: {
    query: productName,
    country: 'FR'
  }
});
```

### 2. Rainforest API (Amazon)

**Avantages:** Spécialisé Amazon, données riches

**Setup:**
1. Créer un compte sur https://www.rainforestapi.com
2. Obtenir votre clé API
3. 1000 requêtes gratuites/mois

```typescript
const response = await fetch('https://api.rainforestapi.com/request', {
  method: 'GET',
  params: {
    api_key: process.env.RAINFOREST_API_KEY,
    type: 'search',
    amazon_domain: 'amazon.fr',
    search_term: productName
  }
});
```

### 3. Amazon Product Advertising API (Officiel)

**Avantages:** Données officielles, fiables

**Inconvénients:** Nécessite un compte Associates, quotas stricts

**Setup:**
1. Créer un compte Amazon Associates
2. Demander l'accès à l'API
3. Obtenir les clés d'accès

```typescript
import crypto from 'crypto';

function signRequest(params: any) {
  // Implémentation de la signature AWS
  // Documentation: https://webservices.amazon.com/paapi5/documentation/
}
```

### 4. ScraperAPI (Solution de Scraping)

**Avantages:** Scraping sans se soucier des blocages

**Setup:**
1. Créer un compte sur https://www.scraperapi.com
2. Obtenir votre clé API

```typescript
const response = await fetch(`http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=${encodedUrl}`);
```

## 🛠️ Implémentation dans le Projet

### Étape 1: Installer les dépendances

```bash
npm install axios node-cache
```

### Étape 2: Créer un service de prix

Créer `lib/priceService.ts`:

```typescript
import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache d'1 heure

export async function fetchAmazonPrice(productName: string) {
  const cacheKey = `amazon_${productName}`;
  const cached = cache.get(cacheKey);

  if (cached) return cached;

  const response = await axios.get('https://api.rainforestapi.com/request', {
    params: {
      api_key: process.env.RAINFOREST_API_KEY,
      type: 'search',
      amazon_domain: 'amazon.fr',
      search_term: productName
    }
  });

  const result = transformAmazonData(response.data);
  cache.set(cacheKey, result);

  return result;
}

function transformAmazonData(data: any) {
  // Transformer les données API en format ProductPrice
  return {
    merchant: 'Amazon',
    price: data.search_results[0].price.value,
    currency: 'EUR',
    url: data.search_results[0].link,
    availability: 'in-stock',
    lastUpdated: new Date()
  };
}
```

### Étape 3: Mettre à jour l'API Route

Modifier `app/api/prices/route.ts`:

```typescript
import { fetchAmazonPrice } from '@/lib/priceService';

async function fetchRealTimePrices(productName: string, category: string) {
  const [amazonPrice, ldlcPrice, materielPrice] = await Promise.all([
    fetchAmazonPrice(productName),
    fetchLDLCPrice(productName),
    fetchMaterielNetPrice(productName)
  ]);

  return [amazonPrice, ldlcPrice, materielPrice];
}
```

## 🔄 Gestion du Cache

### Redis (Recommandé pour production)

```bash
npm install redis
```

```typescript
import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL
});

await redis.connect();

// Utilisation
const cached = await redis.get(`price:${productId}`);
if (cached) return JSON.parse(cached);

// Sauvegarder
await redis.set(`price:${productId}`, JSON.stringify(prices), {
  EX: 3600 // Expire après 1 heure
});
```

## ⚡ Optimisations

### 1. Limitation de Requêtes (Rate Limiting)

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limite de 100 requêtes
});
```

### 2. Queue de Traitement

Pour les mises à jour en masse:

```bash
npm install bull
```

```typescript
import Queue from 'bull';

const priceQueue = new Queue('price-updates', process.env.REDIS_URL);

// Ajouter un job
await priceQueue.add({ productId: '1' });

// Traiter les jobs
priceQueue.process(async (job) => {
  const { productId } = job.data;
  await updateProductPrice(productId);
});
```

### 3. Webhook pour les Mises à Jour

Certaines APIs offrent des webhooks pour être notifié des changements de prix.

## 🔐 Sécurité

### Variables d'Environnement

Ne jamais commit les clés API:

```bash
# .gitignore
.env.local
.env*.local
```

### Validation des Données

```typescript
import { z } from 'zod';

const PriceSchema = z.object({
  price: z.number().positive(),
  merchant: z.string(),
  url: z.string().url()
});

// Valider avant utilisation
const validatedPrice = PriceSchema.parse(apiResponse);
```

## 📊 Monitoring

### Sentry pour les Erreurs

```bash
npm install @sentry/nextjs
```

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  await fetchPrices();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

### Logs

```typescript
console.log('[PRICE API]', {
  timestamp: new Date(),
  productId,
  merchant,
  success: true
});
```

## 🧪 Tests

```typescript
import { fetchAmazonPrice } from '@/lib/priceService';

describe('Price Service', () => {
  it('should fetch Amazon price', async () => {
    const price = await fetchAmazonPrice('DDR5 RAM');
    expect(price.merchant).toBe('Amazon');
    expect(price.price).toBeGreaterThan(0);
  });
});
```

## 📈 Évolution Future

- Implémenter un historique de prix
- Créer des alertes de baisse de prix
- Ajouter des graphiques d'évolution
- Comparer automatiquement les specs techniques
- Recommandations basées sur l'IA

## 🆘 Support

En cas de problème:
1. Vérifier les quotas API
2. Vérifier les clés d'environnement
3. Consulter les logs
4. Tester avec Postman/curl

---

Pour plus d'informations, consultez la documentation des APIs mentionnées.
