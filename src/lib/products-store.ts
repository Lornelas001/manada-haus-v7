import { Product, StockEntry, Rating, SaleRecord } from './types';
import { supabase } from './supabase';

// Las ventas/consultas todavía se guardan en el navegador (localStorage).
// Se migran a Supabase en la Fase 2 (pedidos con registro real).
const SALES_KEY = 'mh-sales-v7';

function mapRow(row: any): Product {
  const sizes = (row.product_sizes || []) as { size: string; qty: number }[];
  const images = (row.product_images || []) as { url: string; sort_order: number }[];
  const ratings = (row.product_ratings || []) as {
    id: string;
    stars: number;
    comment: string | null;
    created_at: string;
  }[];

  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    price: Number(row.price),
    category: row.category_id || '',
    sizes: sizes.map((s) => s.size),
    stock: sizes.map((s) => ({ size: s.size, qty: s.qty })) as StockEntry[],
    images: [...images]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((i) => i.url),
    inStock: row.in_stock,
    featured: row.featured,
    isPromo: row.is_promo,
    ratings: ratings.map((r) => ({
      id: r.id,
      stars: r.stars,
      comment: r.comment || '',
      date: new Date(r.created_at).toLocaleDateString('es-MX'),
    })) as Rating[],
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_sizes(*), product_images(*), product_ratings(*)')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error cargando productos de Supabase:', error);
    return [];
  }

  return (data || []).map(mapRow);
}

export async function addProduct(p: Omit<Product, 'id'>): Promise<Product> {
  const { data: inserted, error } = await supabase
    .from('products')
    .insert({
      name: p.name,
      description: p.description,
      price: p.price,
      category_id: p.category,
      in_stock: p.inStock,
      featured: p.featured,
      is_promo: p.isPromo,
    })
    .select()
    .single();

  if (error || !inserted) throw error || new Error('No se pudo crear el producto');

  const productId = inserted.id as string;

  if (p.images?.length) {
    const { error: imgErr } = await supabase
      .from('product_images')
      .insert(p.images.map((url, i) => ({ product_id: productId, url, sort_order: i })));
    if (imgErr) console.error('Error guardando imágenes:', imgErr);
  }

  if (p.stock?.length) {
    const { error: stockErr } = await supabase
      .from('product_sizes')
      .insert(p.stock.map((s) => ({ product_id: productId, size: s.size, qty: s.qty })));
    if (stockErr) console.error('Error guardando tallas/stock:', stockErr);
  }

  return { ...p, id: productId };
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (updates.name !== undefined) patch.name = updates.name;
  if (updates.description !== undefined) patch.description = updates.description;
  if (updates.price !== undefined) patch.price = updates.price;
  if (updates.category !== undefined) patch.category_id = updates.category;
  if (updates.inStock !== undefined) patch.in_stock = updates.inStock;
  if (updates.featured !== undefined) patch.featured = updates.featured;
  if (updates.isPromo !== undefined) patch.is_promo = updates.isPromo;

  if (Object.keys(patch).length) {
    patch.updated_at = new Date().toISOString();
    const { error } = await supabase.from('products').update(patch).eq('id', id);
    if (error) throw error;
  }

  if (updates.images) {
    await supabase.from('product_images').delete().eq('product_id', id);
    if (updates.images.length) {
      const { error } = await supabase
        .from('product_images')
        .insert(updates.images.map((url, i) => ({ product_id: id, url, sort_order: i })));
      if (error) console.error('Error actualizando imágenes:', error);
    }
  }

  if (updates.stock) {
    await supabase.from('product_sizes').delete().eq('product_id', id);
    if (updates.stock.length) {
      const { error } = await supabase
        .from('product_sizes')
        .insert(updates.stock.map((s) => ({ product_id: id, size: s.size, qty: s.qty })));
      if (error) console.error('Error actualizando tallas/stock:', error);
    }
  }
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

export async function addRating(productId: string, stars: number, comment: string): Promise<void> {
  const { error } = await supabase
    .from('product_ratings')
    .insert({ product_id: productId, stars, comment });
  if (error) throw error;
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
    date: new Date().toISOString(),
  });
  localStorage.setItem(SALES_KEY, JSON.stringify(sales));
}
