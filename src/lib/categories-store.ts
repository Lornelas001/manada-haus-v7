import { ProductCategoryItem } from './types';
import { supabase } from './supabase';

function slugify(label: string): string {
  return (
    label
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'categoria'
  );
}

export async function getCategories(): Promise<ProductCategoryItem[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error cargando categorías de Supabase:', error);
    return [];
  }

  return (data || []).map((c) => ({
    id: c.id,
    label: c.label,
    emoji: c.emoji || undefined,
  }));
}

export async function addCategory(label: string, emoji?: string): Promise<ProductCategoryItem> {
  const id = `${slugify(label)}-${Date.now()}`;

  const { data, error } = await supabase
    .from('categories')
    .insert({ id, label, emoji })
    .select()
    .single();

  if (error || !data) throw error || new Error('No se pudo crear la categoría');

  return { id: data.id, label: data.label, emoji: data.emoji || undefined };
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
}
