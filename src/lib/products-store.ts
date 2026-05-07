import { Product, SaleRecord } from './types';

const PROD_KEY  = 'mh-products-extra-v1';
const SALES_KEY = 'mh-sales-v7';

const defaultProducts: Product[] = [
  {
    id: '0', name: 'Jersey para perro estilo americano – Chiefs Edition',
    description: `Jersey inspirado en los colores de los Kansas City Chiefs.
    Tela suave y ligera que permite libertad de movimiento.
    Diseño deportivo con ajuste cómodo y seguro.
    Disponible en varias tallas.`,
    price: 159, originalPrice: 229, category: 'ropa',
    sizes: ['0','1','2','3','4','5','6'],
    stock: [{size:'0',qty:1},{size:'1',qty:5},{size:'2',qty:5},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2}],
    images: [
      'https://i.ibb.co/0RN50BBV/ba878c20-2431-4d77-93d2-d5a33ebd7cab.jpg', 
    ],
    inStock: true, featured: false, isPromo: false, ratings: [],
  },
  {
    id: '1', name: 'Jersey para perro estilo americano – Raiders Edition',
    description: `Jersey inspirado en los colores de los Raiders.
    Tela suave y ligera que permite libertad de movimiento.
    Diseño deportivo con ajuste cómodo y seguro.
    Disponible en varias tallas.`,    
    price: 159, originalPrice: 229, category: 'ropa',
    sizes: ['0','1','2','3','4','5','6'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2}],
    images: ['https://i.ibb.co/WpVLj7F6/db06d15c-062d-4fc0-87d8-3c03fe3ab83e.jpg'],
    inStock: true, featured: true, isPromo: false, ratings: [],
  },
  {
    id: '2', name: 'Jersey para perro estilo americano – Hello Kitty',
    description: `Jersey inspirado en Hello Kitty.
    Tela suave y ligera que permite libertad de movimiento.
    Diseño deportivo con ajuste cómodo y seguro.
    Disponible en varias tallas.`, 
    price: 159, category: 'ropa', sizes: ['0','1','2','3','4','5','6','7'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2},{size:'7',qty:2}],  
    images: ['https://i.ibb.co/cKCTdNbS/Gemini-Generated-Image-c4ex6ac4ex6ac4ex.png'],
    inStock: true, featured: false, isPromo: false, ratings: [],
  },
        {
    id: '3', name: 'Vestido "What Fills" Primavera',
    description: `Vestido para perro en color rosa con diseño exclusivo
    Bordado de alta calidad con frase “Be YOUtiful”
    Tela suave, cómoda y ligera (ideal para uso diario)
    Corte ergonómico que permite libertad de movimiento
    Perfecto para perritas pequeñas y medianas.`,
    price: 159, category: 'ropa', sizes: ['0','1','2','3','4','5','6','7'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2},{size:'7',qty:2}],  
    images: ['https://i.ibb.co/vvxTwWtV/Whats-App-Image-2026-04-11-at-11-31-41-PM.jpg'],
    inStock: true, featured: false, isPromo: false, ratings: [],
  },
  {
    id: '4', name: 'Vestido "You make me smile" Primavera',
    description: `Vestido para perro en color rosa con diseño exclusivo
    Bordado de alta calidad con frase “Be YOUtiful”
    Tela suave, cómoda y ligera (ideal para uso diario)
    Corte ergonómico que permite libertad de movimiento
    Perfecto para perritas pequeñas y medianas.`,
    price: 159, category: 'ropa', sizes: ['0','1','2','3','4','5','6','7'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2},{size:'7',qty:2}],  
    images: ['https://i.ibb.co/gbZJRDL6/1084ae3a-979c-42f8-a43b-5ae0aa1f557d.jpg'],
    inStock: true, featured: false, isPromo: false, ratings: [],
  },
    {
    id: '5', name: 'Vestido "Today will be great" Primavera',
    description: `Vestido para perro en color rosa con diseño exclusivo
    Bordado de alta calidad con frase “Be YOUtiful”
    Tela suave, cómoda y ligera (ideal para uso diario)
    Corte ergonómico que permite libertad de movimiento
    Perfecto para perritas pequeñas y medianas.`,
    price: 159, category: 'ropa', sizes: ['0','1','2','3','4','5','6','7'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2},{size:'7',qty:2}],  
    images: ['https://i.ibb.co/B2fPL5Q3/2ad89d6b-dd40-4fd3-ad5b-2ae74d5e8d6e.jpg'],
    inStock: true, featured: false, isPromo: false, ratings: [],
  },

    {
    id: '6', name: 'Vestido "Love" Primavera',
    description: `Vestido para perro en color rosa con diseño exclusivo
    Bordado de alta calidad con frase “Be YOUtiful”
    Tela suave, cómoda y ligera (ideal para uso diario)
    Corte ergonómico que permite libertad de movimiento
    Perfecto para perritas pequeñas y medianas.`,    
    price: 159, category: 'ropa', sizes: ['0','1','2','3','4','5','6','7'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2},{size:'7',qty:2}],  
    images: ['https://i.ibb.co/tTd8TxL9/41c9e1b7-d477-4a89-a057-884727eb53f4.jpg'],
    inStock: true, featured: false, isPromo: false, ratings: [],
  },

      {
    id: '7', name: 'Jersey Selección México para Perro Mundial Talla 0 - 6',
    description: `Apoya a la selección junto con tu mejor amigo 
    Viste a tu mascota con el jersey de la selección mexicana para perro y celebren juntos el Mundial.
    ✔ Tela cómoda y ligera
    ✔ Ideal para paseos o ver los partidos
    ✔ Disponible en varias tallas`,
    price: 269, category: 'ropa', sizes: ['0','1','2','3','4','5','6'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2},{size:'7',qty:2}],  
    images: ['https://i.ibb.co/k20r9s4x/Gemini-Generated-Image-ehfr1jehfr1jehfr-1.png'],
    inStock: true, featured: true, isPromo: false, ratings: [],
  },

        {
    id: '8', name: 'Jersey Selección México para Perro Mundial Talla 7 - 10',
    description: `Apoya a la selección junto con tu mejor amigo 
    Viste a tu mascota con el jersey de la selección mexicana para perro y celebren juntos el Mundial.
    ✔ Tela cómoda y ligera
    ✔ Ideal para paseos o ver los partidos
    ✔ Disponible en varias tallas`,
    price: 339, category: 'ropa', sizes: ['7','8','9','10'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2},{size:'7',qty:2}],  
    images: ['https://i.ibb.co/hFFGqddv/Gemini-Generated-Image-9huchd9huchd9huc-1.png'],
    inStock: true, featured: true, isPromo: false, ratings: [],
  },

          {
    id: '9', name: 'Bata con capucha | Ropa de baño para mascotas',
    description: `Mantén a tu mascota calientita, cómoda y protegida del frío con nuestra toalla de baño con capucha, suave y de alta calidad`,
    price: 339, category: 'ropa', sizes: ['0','1','2','3','4','5','6'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2},{size:'7',qty:2}],  
    images: ['https://i.ibb.co/jZxY0nCb/Bataroja.jpg'],
    inStock: true, featured: true, isPromo: false, ratings: [],
  },

          {
    id: '10', name: 'Bata con capucha | Ropa de baño para mascotas',
    description: `Mantén a tu mascota calientita, cómoda y protegida del frío con nuestra toalla de baño con capucha, suave y de alta calidad`,
    price: 339, category: 'ropa', sizes: ['0','1','2','3','4','5','6'],
    stock: [{size:'0',qty:1},{size:'1',qty:100},{size:'2',qty:100},{size:'3',qty:5},{size:'4',qty:2},{size:'5',qty:5},{size:'6',qty:2},{size:'7',qty:2}],  
    images: ['https://i.ibb.co/Y4bTgjJS/Batarosa.jpg'],
    inStock: true, featured: true, isPromo: false, ratings: [],
  },

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
  return [...defaultProducts, ...localOnly];
}

export function saveProducts(p: Product[]) {
  // guarda solo los productos locales extra, no los base del código
  const localOnly = p.filter(
    (product) => !defaultProducts.some((baseProduct) => baseProduct.id === product.id)
  );
  saveProductsExtra(localOnly);
}

export function addProduct(p: Omit<Product,'id'>): Product {
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