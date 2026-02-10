# 💰 Guide d'Affiliation Multi-Marchands

## Configuration des Tags d'Affiliation

Pour gagner de l'argent avec votre comparateur, vous devez vous inscrire aux programmes d'affiliation de chaque marchant.

### 1. Amazon Associates (France)

**Inscription:** https://partenaires.amazon.fr

1. Créer un compte Amazon Associates
2. Remplir les informations sur votre site
3. Attendre l'approbation (généralement 24-48h)
4. Récupérer votre **Associate ID** (ex: `monsite-21`)

**Commission:** 1-10% selon la catégorie de produit
- Composants informatiques: ~2-4%
- GPU/Processeurs: ~1-3%

**Ajouter dans `.env.local`:**
```bash
AMAZON_AFFILIATE_TAG=monsite-21
```

---

### 2. LDLC Programme Partenaire

**Inscription:** https://www.ldlc.com/partenaires

1. Créer un compte partenaire LDLC
2. Attendre validation
3. Récupérer votre **Partner ID**

**Commission:** 2-4% selon le produit

**Ajouter dans `.env.local`:**
```bash
LDLC_AFFILIATE_TAG=votre-partner-id
```

---

### 3. Materiel.net Affiliation

**Inscription:** Contacter Materiel.net directement ou via une plateforme d'affiliation (Awin, Tradedoubler)

**Commission:** 1-3%

**Ajouter dans `.env.local`:**
```bash
MATERIELNET_AFFILIATE_TAG=votre-affiliate-id
```

---

## Utilisation du Système

### Actualiser les prix d'un produit

```bash
curl -X POST http://localhost:3000/api/update-prices \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "gpu-rtx-4090",
    "searchQuery": "RTX 4090"
  }'
```

### Scraper sans sauvegarder

```bash
curl "http://localhost:3000/api/scrape?q=RTX%204090&merchant=all"
```

---

## Migration Supabase

Avant d'utiliser le système, exécuter dans Supabase SQL Editor:

```sql
-- Fichier: supabase-add-affiliate-url.sql
ALTER TABLE product_prices
ADD COLUMN IF NOT EXISTS affiliate_url TEXT;
```

---

## 💡 Conseils pour Maximiser les Revenus

### 1. **Diversifiez les marchands**
Plus vous avez de marchands, plus vous captez de clics

### 2. **Mettez en avant le meilleur prix**
Les utilisateurs cliquent sur le prix le plus bas → plus de conversions

### 3. **Actualisez régulièrement**
Prix frais = confiance = plus de clics

### 4. **Ajoutez des badges**
- "Meilleur prix"
- "Livraison gratuite"
- "En stock"

### 5. **Call-to-action clair**
Boutons "Voir l'offre" plutôt que juste des liens

---

## 📊 Estimation de Revenus

**Exemple:**
- 1000 visiteurs/jour
- 5% cliquent sur un produit → 50 clics
- 2% achètent → 1 vente/jour
- Panier moyen: 400€
- Commission moyenne: 3%
- **= 12€/jour = 360€/mois = 4,320€/an**

Avec 10,000 visiteurs/jour:
- **= 43,200€/an** 🚀

---

## ⚠️ Important

- Respecter les CGU de chaque programme d'affiliation
- Mentionner clairement que le site contient des liens affiliés
- Ne jamais cliquer sur vos propres liens
- Surveiller les taux de conversion dans les dashboards marchands
