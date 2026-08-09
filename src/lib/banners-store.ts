import { supabase } from './supabase';

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  imageFit: 'cover' | 'contain';
  gradientFrom?: string;
  active: boolean;
  sortOrder: number;
}

function mapRow(row: any): Banner {
  return {
    id: row.id,
    title: row.title || '',
    subtitle: row.subtitle || '',
    ctaText: row.cta_text || '',
    ctaLink: row.cta_link || '#catalogo',
    imageUrl: row.image_url,
    imageFit: row.image_fit === 'contain' ? 'contain' : 'cover',
    gradientFrom: row.gradient_from || undefined,
    active: row.active,
    sortOrder: row.sort_order,
  };
}

// Todos los banners, ordenados (para el panel de admin)
export async function getAllBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error cargando banners de Supabase:', error);
    return [];
  }

  return (data || []).map(mapRow);
}

// Solo los banners activos (para el sitio público)
export async function getActiveBanners(): Promise<Banner[]> {
  const all = await getAllBanners();
  return all.filter((b) => b.active);
}

export async function addBanner(b: Omit<Banner, 'id'>): Promise<Banner> {
  const { data, error } = await supabase
    .from('banners')
    .insert({
      title: b.title,
      subtitle: b.subtitle,
      cta_text: b.ctaText,
      cta_link: b.ctaLink,
      image_url: b.imageUrl,
      image_fit: b.imageFit,
      gradient_from: b.gradientFrom || null,
      active: b.active,
      sort_order: b.sortOrder,
    })
    .select()
    .single();

  if (error || !data) throw error || new Error('No se pudo crear el banner');
  return mapRow(data);
}

export async function updateBanner(id: string, updates: Partial<Banner>): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (updates.title !== undefined) patch.title = updates.title;
  if (updates.subtitle !== undefined) patch.subtitle = updates.subtitle;
  if (updates.ctaText !== undefined) patch.cta_text = updates.ctaText;
  if (updates.ctaLink !== undefined) patch.cta_link = updates.ctaLink;
  if (updates.imageUrl !== undefined) patch.image_url = updates.imageUrl;
  if (updates.imageFit !== undefined) patch.image_fit = updates.imageFit;
  if (updates.gradientFrom !== undefined) patch.gradient_from = updates.gradientFrom || null;
  if (updates.active !== undefined) patch.active = updates.active;
  if (updates.sortOrder !== undefined) patch.sort_order = updates.sortOrder;

  const { error } = await supabase.from('banners').update(patch).eq('id', id);
  if (error) throw error;
}

export async function deleteBanner(id: string): Promise<void> {
  const { error } = await supabase.from('banners').delete().eq('id', id);
  if (error) throw error;
}
