-- Ajouter la colonne affiliate_url pour les liens d'affiliation
-- À exécuter dans Supabase SQL Editor

ALTER TABLE product_prices
ADD COLUMN IF NOT EXISTS affiliate_url TEXT;

-- Mettre à jour les liens existants (copier url vers affiliate_url si vide)
UPDATE product_prices
SET affiliate_url = url
WHERE affiliate_url IS NULL;

-- Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_product_prices_affiliate
ON product_prices(product_id, merchant);
