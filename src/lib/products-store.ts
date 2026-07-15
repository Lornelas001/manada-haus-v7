import { Product, SaleRecord } from './types';
import {
  sampleJerseyVerde,
  sampleGabardinaCafe,
  sampleGabardinaRosa,
  sampleGabardinaAzul,
  sampleHoodieLila,
  sampleHoodieAzul2,
  sampleHoodieNegra,
  samplePlayeraPolo,
} from './placeholder-images';

const PROD_KEY = 'mh-products-extra-v1';
const SALES_KEY = 'mh-sales-v7';

const defaultProducts: Product[] = [


  // ---------- FÚTBOL ⚽ ----------
  {
    id: '1', name: 'Jersey México Negro',
    description: `Jersey negro de México para mascota.`,
    price: 249, category: 'futbol',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: [sampleJerseyVerde], // TODO: reemplazar con foto real del producto
    inStock: true, featured: true, isPromo: false, ratings: []
  },
  {
    id: '2', name: 'Jersey México Verde',
    description: `Tela ligera y cómoda · Ajuste perfecto · Diseño 2026`,
    price: 249, category: 'futbol',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: [sampleJerseyVerde], // TODO: reemplazar con foto real del producto
    inStock: true, featured: false, isPromo: false, ratings: []
  },
  {
    id: '3', name: 'Jersey México Blanco',
    description: `Tela ligera y cómoda · Ajuste perfecto · Diseño 2026`,
    price: 249, category: 'futbol',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: [sampleJerseyVerde], // TODO: reemplazar con foto real del producto
    inStock: true, featured: false, isPromo: false, ratings: []
  },

  // ---------- HOGAR 🐾 ----------
  {
    id: '4', name: 'Dispensador inteligente',
    description: `Dispensador Inteligente para Mascotas con Cámara, modelo Nexxt NHA-P610 (V2). Incluye cámara con visión nocturna, audio bidireccional, capacidad de 1.59 kg de alimento seco, porciones programables de 10 a 70 g, horarios automáticos, control desde app Nexxt Home, compatible con Alexa y Google Home, conexión WiFi.`,
    price: 1199, category: 'hogar',
    sizes: ['Única'],
    stock: [{ size: 'Única', qty: 1 }],
    images: ['https://i.ibb.co/ppXCd9L/Whats-App-Image-2026-06-10-at-12-25-30-AM.jpg'],
    inStock: true, featured: true, isPromo: false, ratings: []
  },

  // ---------- MAMELUCOS ⭐ ----------
  {
    id: '5', name: 'Pizza Planet Alien',
    description: `Mameluco Disney · Toy Story Alien · Azul con gorro`,
    price: 199, category: 'mamelucos',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: ['https://i.ibb.co/kgNN3YPw/Whats-App-Image-2026-05-27-at-12-29-05-AM-1.jpg'],
    inStock: true, featured: false, isPromo: false, ratings: []
  },
  {
    id: '6', name: 'Lotso',
    description: `Mameluco Disney · Toy Story Lotso · Rosa con gorro`,
    price: 199, category: 'mamelucos',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: ['https://i.ibb.co/Rkmhwm2y/Whats-App-Image-2026-05-27-at-12-29-05-AM.jpg'],
    inStock: true, featured: false, isPromo: false, ratings: []
  },
  {
    id: '7', name: 'Boo',
    description: `Mameluco Disney · Monsters Inc Boo · Morado con gorro`,
    price: 199, category: 'mamelucos',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: ['https://i.ibb.co/jvRCPqP6/Whats-App-Image-2026-05-29-at-1-34-47-PM.jpg'],
    inStock: true, featured: false, isPromo: false, ratings: []
  },

  // ---------- GABARDINA ⛅ ----------
  {
    id: '8', name: 'Gabardina DogFace Café',
    description: `Tela suave, cómoda y resistente · Interior cálido para días frescos · Capucha funcional · Fácil de lavar`,
    price: 220, category: 'gabardina',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: [
      'https://i.ibb.co/8LbQwcwd/747587077-26774568078885129-1073044489059636122-n.jpg',
    ],    
    inStock: true, featured: false, isPromo: false, ratings: []
  },
  {
    id: '9', name: 'Gabardina DogFace Rosa',
    description: `Tela suave, cómoda y resistente · Interior cálido para días frescos · Capucha funcional · Fácil de lavar`,
    price: 220, category: 'gabardina',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: [
      'https://i.ibb.co/twbKTWnH/748789463-1353926630196062-1522009188470620979-n.jpg',
    ],    
    inStock: true, featured: false, isPromo: false, ratings: []
  },
  {
    id: '10', name: 'Gabardina DogFace Azul',
    description: `Tela suave, cómoda y resistente · Interior cálido para días frescos · Capucha funcional · Fácil de lavar`,
    price: 220, category: 'gabardina',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: [
      'https://i.ibb.co/67KzDndZ/747753717-3179614815572773-9051145530865282913-n.jpg',
    ],    
    inStock: true, featured: false, isPromo: false, ratings: []
  },
  {
    id: '10', name: 'Impermeable Manada',
    description: `Tela impermeable de alta calidad · Capucha protectora · Colores de alta visibilidad para mayor seguridad · Fácil de limpiar`,
    price: 209, category: 'gabardina',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: [
      'https://i.ibb.co/d45hRZRh/Whats-App-Image-2026-07-14-at-10-41-27-PM.jpg',
      'https://i.ibb.co/x4ftnyc/Whats-App-Image-2026-07-14-at-10-41-28-PM.jpg',
      'https://i.ibb.co/SDGc6CW8/Whats-App-Image-2026-07-14-at-10-41-27-PM-2.jpg',
      'https://i.ibb.co/nWdWWmG/Whats-App-Image-2026-07-14-at-10-41-27-PM-1.jpg',
      'https://i.ibb.co/NnCQHtNn/fc672ba6-e183-4710-b5f2-87611cf0f28f.jpg',
    ],    
    inStock: true, featured: false, isPromo: false, ratings: []
  },

  // ---------- HOODIES 🥶 ----------
  {
    id: '11', name: 'Hoodie Lila',
    description: `Sudadera con capucha · Tela premium, suave y resistente · Interior cómodo y cálido · Bolsillo tipo canguro · Ideal para otoño, invierno y días frescos`,
    price: 249, category: 'hoodies',
    sizes: ['0', '1', '2', '3', '4', '5', '6','7','8','9'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }, { size: '7', qty: 1 }, { size: '8', qty: 1 },{ size: '9', qty: 1 }],
    images: ['https://i.ibb.co/43dTpnh/744821874-1394645605843105-2577307523090608512-n.jpg'], // TODO: reemplazar con foto real del producto
    inStock: true, featured: false, isPromo: false, ratings: []
  },
  {
    id: '12', name: 'Hoodie Azul',
    description: `Sudadera con capucha · Tela premium, suave y resistente · Interior cómodo y cálido · Bolsillo tipo canguro · Ideal para otoño, invierno y días frescos`,
    price: 249, category: 'hoodies',
    sizes: ['0', '1', '2', '3', '4', '5', '6','7','8','9'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }, { size: '7', qty: 1 }, { size: '8', qty: 1 },{ size: '9', qty: 1 }],
    images: ['https://i.ibb.co/cK9w4cKN/748597990-1036875525961865-9163259355321568767-n.jpg'], // TODO: reemplazar con foto real del producto
    inStock: true, featured: false, isPromo: false, ratings: []
  },
  {
    id: '13', name: 'Hoodie negra',
    description: `Sudadera con capucha · Tela premium, suave y resistente · Interior cómodo y cálido · Bolsillo tipo canguro · Ideal para otoño, invierno y días frescos`,
    price: 249, category: 'hoodies',
    sizes: ['0', '1', '2', '3', '4', '5', '6','7','8','9'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }, { size: '7', qty: 1 }, { size: '8', qty: 1 },{ size: '9', qty: 1 }],
    images: ['https://i.ibb.co/Zzv8Py4p/746927801-1568949514738612-3847095070658745944-n.jpg'], // TODO: reemplazar con foto real del producto
    inStock: true, featured: false, isPromo: false, ratings: []
  },
    {
    id: '16', name: 'Hoodie roja',
    description: `Sudadera con capucha · Tela premium, suave y resistente · Interior cómodo y cálido · Bolsillo tipo canguro · Ideal para otoño, invierno y días frescos`,
    price: 249, category: 'hoodies',
    sizes: ['0', '1', '2', '3', '4', '5', '6','7','8','9'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }, { size: '7', qty: 1 }, { size: '8', qty: 1 },{ size: '9', qty: 1 }],
    images: ['https://i.ibb.co/xtRcSQY2/746004758-1594190002356001-3209790486872933523-n.jpg'], // TODO: reemplazar con foto real del producto
    inStock: true, featured: false, isPromo: false, ratings: []
  },

  // ---------- ELEGANTE 🎀 ----------
  {
    id: '14', name: 'Vestido Perrioni',
    description: `Vestido rojo elegante para mascota.`,
    price: 198, category: 'elegante',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: [
      'https://i.ibb.co/cX2QbBcr/Whats-App-Image-2026-06-10-at-12-25-31-AM.jpg',
      'https://i.ibb.co/jk7LyGWp/Whats-App-Image-2026-06-10-at-12-25-34-AM.jpg',
      'https://i.ibb.co/wNRJsgX5/Whats-App-Image-2026-06-10-at-12-25-32-AM.jpg'
    ],
    inStock: true, featured: false, isPromo: false, ratings: []
  },
  {
    id: '15', name: 'Playera Polo',
    description: `Tela suave y ligera · Diseño tipo polo con cuello y botones · Corte cómodo que permite libertad de movimiento · Acabados de alta calidad`,
    price: 189, category: 'elegante',
    sizes: ['0', '1', '2', '3', '4', '5', '6'],
    stock: [{ size: '0', qty: 1 }, { size: '1', qty: 1 }, { size: '2', qty: 1 }, { size: '3', qty: 1 }, { size: '4', qty: 1 }, { size: '5', qty: 1 }, { size: '6', qty: 1 }],
    images: [
      'https://i.ibb.co/hFD6fWys/745334036-1528106905459892-4495754564600890590-n.jpg',
      'https://i.ibb.co/ZRVkFCPq/748175824-2939941296385245-460586812330724837-n.jpg',
      'https://i.ibb.co/v6LQkkgd/747771092-4515365395360417-1519404047545644203-n.jpg'
    ],    
    inStock: true, featured: true, isPromo: false, ratings: []
  }

];

function readProductsExtra(): Product[] {
  try {
    return JSON.parse(localStorage.getItem(PROD_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveProductsExtra(products: Product[]) {
  localStorage.setItem(PROD_KEY, JSON.stringify(products));
}

export function getProducts(): Product[] {
  const extraProducts = readProductsExtra();

  // solo conserva productos locales cuyo id NO exista ya en el código
  const localOnly = extraProducts.filter(
    (localProduct) => !defaultProducts.some((baseProduct) => baseProduct.id === localProduct.id)
  );

  // aquí gana el deploy/código
  return [...defaultProducts, ...localOnly].sort((a, b) => Number(a.id) - Number(b.id));
}

export function saveProducts(p: Product[]) {
  // guarda solo los productos locales extra, no los base del código
  const localOnly = p.filter(
    (product) => !defaultProducts.some((baseProduct) => baseProduct.id === product.id)
  );
  saveProductsExtra(localOnly);
}

export function addProduct(p: Omit<Product, 'id'>): Product {
  const extraProducts = readProductsExtra();
  const np = { ...p, id: crypto.randomUUID() };
  extraProducts.push(np);
  saveProductsExtra(extraProducts);
  return np;
}

export function updateProduct(id: string, updates: Partial<Product>): Product {
  const isBaseProduct = defaultProducts.some((p) => p.id === id);

  // si es producto del código, el deploy manda
  if (isBaseProduct) {
    const base = defaultProducts.find((p) => p.id === id)!;
    return { ...base, ...updates };
  }

  const extraProducts = readProductsExtra().map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );

  saveProductsExtra(extraProducts);
  return extraProducts.find((p) => p.id === id)!;
}

export function deleteProduct(id: string) {
  const isBaseProduct = defaultProducts.some((p) => p.id === id);

  // productos base no se borran localmente porque el deploy manda
  if (isBaseProduct) return;

  const extraProducts = readProductsExtra().filter((p) => p.id !== id);
  saveProductsExtra(extraProducts);
}

export function addRating(productId: string, stars: number, comment: string) {
  const products = getProducts();
  const p = products.find((x) => x.id === productId);
  if (!p) return;

  p.ratings = [
    ...(p.ratings || []),
    {
      id: crypto.randomUUID(),
      stars,
      comment,
      date: new Date().toLocaleDateString('es-MX')
    }
  ];

  updateProduct(productId, { ratings: p.ratings });
}

export function getSales(): SaleRecord[] {
  try {
    return JSON.parse(localStorage.getItem(SALES_KEY) || '[]');
  } catch {
    return [];
  }
}

export function recordSale(productId: string, productName: string, price: number, size: string) {
  const sales = getSales();
  sales.push({
    id: crypto.randomUUID(),
    productId,
    productName,
    price,
    size,
    date: new Date().toISOString()
  });
  localStorage.setItem(SALES_KEY, JSON.stringify(sales));
}