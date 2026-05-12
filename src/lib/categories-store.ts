import { ProductCategoryItem } from './types';

const STORAGE_KEY = 'mascota-directa-categories';

const defaultCategories: ProductCategoryItem[] = [
  { id: 'Mexico', label: 'Vive el mundial con el tri', emoji: '⚽🇲🇽' },
  { id: 'perro', label: 'Perro', emoji: '🐕' },
  { id: 'gato', label: 'Gato', emoji: '🐈' },
  { id: 'ropa', label: 'Ropa', emoji: '👕' },
  { id: 'deportes', label: 'Deportes', emoji: '🏀' },
  { id: 'hogar', label: 'Hogar', emoji: '🏡' },

];

export function getCategories(): ProductCategoryItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
  return defaultCategories;
}

export function saveCategories(categories: ProductCategoryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export function addCategory(label: string, emoji?: string): ProductCategoryItem {
  const categories = getCategories();
  const newCat: ProductCategoryItem = {
    id: label.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
    label,
    emoji,
  };
  categories.push(newCat);
  saveCategories(categories);
  return newCat;
}

export function deleteCategory(id: string) {
  const categories = getCategories().filter((c) => c.id !== id);
  saveCategories(categories);
}
