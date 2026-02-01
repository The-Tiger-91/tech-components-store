import { Product, Category } from '@/types/product';

export const categories: Category[] = [
  {
    id: 'motherboard',
    name: 'Cartes Mères',
    description: 'Cartes mères pour PC et robotique',
    icon: '🔲',
    productCount: 45
  },
  {
    id: 'ram',
    name: 'Mémoire RAM',
    description: 'RAM DDR4/DDR5 pour systèmes AI et robotique',
    icon: '💾',
    productCount: 78
  },
  {
    id: 'cooling',
    name: 'Refroidissement',
    description: 'Ventilateurs et watercooling',
    icon: '❄️',
    productCount: 56
  },
  {
    id: 'processor',
    name: 'Processeurs',
    description: 'CPU pour calcul IA et haute performance',
    icon: '⚡',
    productCount: 34
  },
  {
    id: 'gpu',
    name: 'Cartes Graphiques',
    description: 'GPU pour deep learning et calcul parallèle',
    icon: '🎮',
    productCount: 42
  },
  {
    id: 'storage',
    name: 'Stockage',
    description: 'SSD NVMe et disques haute performance',
    icon: '💿',
    productCount: 67
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Corsair Vengeance DDR5 64GB (2x32GB) 6000MHz',
    category: 'ram',
    description: 'Mémoire RAM DDR5 haute performance optimisée pour les workloads d\'IA et de machine learning. Latence CL36, idéale pour les systèmes de robotique et calcul intensif.',
    specifications: {
      'Capacité': '64GB (2x32GB)',
      'Type': 'DDR5',
      'Fréquence': '6000MHz',
      'Latence': 'CL36',
      'Voltage': '1.35V',
      'RGB': 'Non',
      'Compatibilité': 'Intel 12th Gen+, AMD Ryzen 7000+'
    },
    image: '/images/ram-corsair.jpg',
    prices: [
      {
        merchant: 'Amazon',
        price: 289.99,
        currency: 'EUR',
        url: 'https://amazon.fr',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      },
      {
        merchant: 'LDLC',
        price: 299.95,
        currency: 'EUR',
        url: 'https://ldlc.com',
        lastUpdated: new Date(),
        shipping: 5.99,
        availability: 'in-stock'
      },
      {
        merchant: 'Materiel.net',
        price: 285.90,
        currency: 'EUR',
        url: 'https://materiel.net',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      }
    ],
    averageRating: 4.8,
    reviewCount: 342,
    inStock: true,
    tags: ['AI', 'Machine Learning', 'Haute Performance']
  },
  {
    id: '2',
    name: 'G.Skill Trident Z5 RGB DDR5 96GB (2x48GB) 5600MHz',
    category: 'ram',
    description: 'Kit mémoire DDR5 96GB avec éclairage RGB pour stations de travail IA et serveurs de calcul. Parfait pour les applications de deep learning nécessitant de grandes quantités de RAM.',
    specifications: {
      'Capacité': '96GB (2x48GB)',
      'Type': 'DDR5',
      'Fréquence': '5600MHz',
      'Latence': 'CL40',
      'Voltage': '1.25V',
      'RGB': 'Oui',
      'Compatibilité': 'Intel 12th Gen+, AMD Ryzen 7000+'
    },
    image: '/images/ram-gskill.jpg',
    prices: [
      {
        merchant: 'Amazon',
        price: 425.00,
        currency: 'EUR',
        url: 'https://amazon.fr',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      },
      {
        merchant: 'TopAchat',
        price: 419.90,
        currency: 'EUR',
        url: 'https://topachat.com',
        lastUpdated: new Date(),
        shipping: 4.99,
        availability: 'limited'
      }
    ],
    averageRating: 4.7,
    reviewCount: 189,
    inStock: true,
    tags: ['AI', 'RGB', 'Haute Capacité']
  },
  {
    id: '3',
    name: 'Noctua NH-D15 Ventilateur CPU Premium',
    category: 'cooling',
    description: 'Refroidisseur CPU ultra-silencieux avec double ventilateur de 140mm. Performance de refroidissement exceptionnelle pour processeurs haute puissance utilisés dans le calcul IA.',
    specifications: {
      'Type': 'Air Cooling',
      'Ventilateurs': '2x 140mm',
      'Hauteur': '165mm',
      'TDP': 'Jusqu\'à 250W',
      'Niveau sonore': '24.6 dB(A)',
      'Compatibilité': 'Intel LGA1700/1200, AMD AM5/AM4'
    },
    image: '/images/noctua.jpg',
    prices: [
      {
        merchant: 'Amazon',
        price: 109.90,
        currency: 'EUR',
        url: 'https://amazon.fr',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      },
      {
        merchant: 'LDLC',
        price: 114.95,
        currency: 'EUR',
        url: 'https://ldlc.com',
        lastUpdated: new Date(),
        shipping: 5.99,
        availability: 'in-stock'
      },
      {
        merchant: 'Materiel.net',
        price: 107.90,
        currency: 'EUR',
        url: 'https://materiel.net',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      }
    ],
    averageRating: 4.9,
    reviewCount: 1247,
    inStock: true,
    tags: ['Silencieux', 'Performance', 'Premium']
  },
  {
    id: '4',
    name: 'ASUS ROG STRIX Z790-E Gaming WiFi',
    category: 'motherboard',
    description: 'Carte mère ATX haut de gamme avec support DDR5, PCIe 5.0, et refroidissement avancé. Idéale pour les builds d\'IA et de robotique nécessitant une connectivité étendue.',
    specifications: {
      'Format': 'ATX',
      'Chipset': 'Intel Z790',
      'Socket': 'LGA1700',
      'Mémoire': 'DDR5 jusqu\'à 7800MHz',
      'PCIe': '5.0 x16, 4.0 x4',
      'Stockage': '4x M.2 NVMe',
      'Réseau': 'WiFi 6E, 2.5Gb LAN'
    },
    image: '/images/asus-rog.jpg',
    prices: [
      {
        merchant: 'Amazon',
        price: 449.90,
        currency: 'EUR',
        url: 'https://amazon.fr',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      },
      {
        merchant: 'LDLC',
        price: 459.95,
        currency: 'EUR',
        url: 'https://ldlc.com',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      }
    ],
    averageRating: 4.6,
    reviewCount: 523,
    inStock: true,
    tags: ['Gaming', 'AI Ready', 'WiFi 6E']
  },
  {
    id: '5',
    name: 'AMD Ryzen 9 7950X 16-Core Processor',
    category: 'processor',
    description: 'Processeur 16 cœurs / 32 threads avec architecture Zen 4. Performance exceptionnelle pour les workloads parallèles d\'IA, machine learning et calcul scientifique.',
    specifications: {
      'Cœurs': '16',
      'Threads': '32',
      'Fréquence Base': '4.5 GHz',
      'Fréquence Boost': 'Jusqu\'à 5.7 GHz',
      'Cache': '80MB',
      'TDP': '170W',
      'Socket': 'AM5'
    },
    image: '/images/ryzen-9.jpg',
    prices: [
      {
        merchant: 'Amazon',
        price: 579.00,
        currency: 'EUR',
        url: 'https://amazon.fr',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      },
      {
        merchant: 'Materiel.net',
        price: 569.90,
        currency: 'EUR',
        url: 'https://materiel.net',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      },
      {
        merchant: 'TopAchat',
        price: 585.00,
        currency: 'EUR',
        url: 'https://topachat.com',
        lastUpdated: new Date(),
        shipping: 4.99,
        availability: 'limited'
      }
    ],
    averageRating: 4.8,
    reviewCount: 891,
    inStock: true,
    tags: ['AI', 'Multi-threading', 'Haute Performance']
  },
  {
    id: '6',
    name: 'NVIDIA RTX 4090 24GB GDDR6X',
    category: 'gpu',
    description: 'Carte graphique flagship avec 24GB de VRAM GDDR6X. Performance ultime pour le deep learning, l\'entraînement de modèles IA et le calcul CUDA.',
    specifications: {
      'GPU': 'Ada Lovelace AD102',
      'VRAM': '24GB GDDR6X',
      'CUDA Cores': '16384',
      'Tensor Cores': '512 Gen 4',
      'Interface': 'PCIe 4.0 x16',
      'TDP': '450W',
      'Connecteurs': '3x DisplayPort 1.4a, 1x HDMI 2.1'
    },
    image: '/images/rtx-4090.jpg',
    prices: [
      {
        merchant: 'Amazon',
        price: 1899.00,
        currency: 'EUR',
        url: 'https://amazon.fr',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'limited'
      },
      {
        merchant: 'LDLC',
        price: 1949.95,
        currency: 'EUR',
        url: 'https://ldlc.com',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      }
    ],
    averageRating: 4.9,
    reviewCount: 672,
    inStock: true,
    tags: ['Deep Learning', 'CUDA', 'Professional']
  },
  {
    id: '7',
    name: 'Samsung 990 PRO 2TB NVMe SSD PCIe 4.0',
    category: 'storage',
    description: 'SSD NVMe ultra-rapide avec vitesses de lecture jusqu\'à 7450 MB/s. Parfait pour le stockage de datasets IA et applications nécessitant des E/S rapides.',
    specifications: {
      'Capacité': '2TB',
      'Interface': 'PCIe 4.0 x4, NVMe 2.0',
      'Lecture': 'Jusqu\'à 7450 MB/s',
      'Écriture': 'Jusqu\'à 6900 MB/s',
      'IOPS Lecture': 'Jusqu\'à 1400K',
      'IOPS Écriture': 'Jusqu\'à 1550K',
      'Endurance': '1200 TBW'
    },
    image: '/images/samsung-990.jpg',
    prices: [
      {
        merchant: 'Amazon',
        price: 189.99,
        currency: 'EUR',
        url: 'https://amazon.fr',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      },
      {
        merchant: 'Materiel.net',
        price: 184.90,
        currency: 'EUR',
        url: 'https://materiel.net',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      },
      {
        merchant: 'TopAchat',
        price: 192.00,
        currency: 'EUR',
        url: 'https://topachat.com',
        lastUpdated: new Date(),
        shipping: 4.99,
        availability: 'in-stock'
      }
    ],
    averageRating: 4.7,
    reviewCount: 1034,
    inStock: true,
    tags: ['NVMe', 'Haute Vitesse', 'Fiable']
  },
  {
    id: '8',
    name: 'Arctic Liquid Freezer II 360 AIO',
    category: 'cooling',
    description: 'Watercooling AIO 360mm avec pompe VRM intégrée. Refroidissement exceptionnel pour processeurs overclockés et workloads IA intensifs 24/7.',
    specifications: {
      'Type': 'Watercooling AIO',
      'Radiateur': '360mm (3x 120mm)',
      'Pompe': 'VRM intégrée',
      'TDP': 'Jusqu\'à 300W',
      'Niveau sonore': '0.3 Sone',
      'Compatibilité': 'Intel LGA1700/1200, AMD AM5/AM4'
    },
    image: '/images/arctic-aio.jpg',
    prices: [
      {
        merchant: 'Amazon',
        price: 119.90,
        currency: 'EUR',
        url: 'https://amazon.fr',
        lastUpdated: new Date(),
        shipping: 0,
        availability: 'in-stock'
      },
      {
        merchant: 'LDLC',
        price: 124.95,
        currency: 'EUR',
        url: 'https://ldlc.com',
        lastUpdated: new Date(),
        shipping: 5.99,
        availability: 'in-stock'
      }
    ],
    averageRating: 4.8,
    reviewCount: 756,
    inStock: true,
    tags: ['Watercooling', 'Silencieux', '24/7']
  }
];

// Fonction pour obtenir le meilleur prix
export function getBestPrice(product: Product) {
  if (product.prices.length === 0) return null;

  return product.prices.reduce((best, current) => {
    const bestTotal = best.price + (best.shipping || 0);
    const currentTotal = current.price + (current.shipping || 0);
    return currentTotal < bestTotal ? current : best;
  });
}

// Fonction pour calculer l'économie potentielle
export function getSavings(product: Product) {
  if (product.prices.length < 2) return 0;

  const prices = product.prices.map(p => p.price + (p.shipping || 0));
  const max = Math.max(...prices);
  const min = Math.min(...prices);

  return max - min;
}
