import { Product, ProductCategoryItem, StockEntry } from '@/lib/types';
import { Pencil, ImagePlus, X, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Props {
  product: Product;
  categories: ProductCategoryItem[];
  onSave: (id: string, u: Partial<Product>) => void;
}

const SIZE_PRESETS = {
  numeric_0_10: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  letters_xs_xxl: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
};

export function EditProductDialog({ product, categories, onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);
  const [isPromo, setIsPromo] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    setName(product.name);
    setDescription(product.description);
    setPrice(String(product.price));
    setOriginalPrice(String(product.originalPrice || ''));
    setCategory(product.category);
    setFeatured(product.featured);
    setIsPromo(product.isPromo);
    setImages([...product.images]);
    setStockEntries(
      product.stock?.length
        ? [...product.stock]
        : product.sizes.map((s) => ({ size: s, qty: 0 }))
    );
  }, [open, product]);

  const addSzRow = () => setStockEntries((p) => [...p, { size: '', qty: 0 }]);

  const rmSzRow = (i: number) =>
    setStockEntries((p) => p.filter((_, j) => j !== i));

  const updSzRow = (i: number, f: 'size' | 'qty', v: string | number) =>
    setStockEntries((p) =>
      p.map((e, j) => (j === i ? { ...e, [f]: v } : e))
    );

  const applyPreset = (sizes: string[]) => {
    setStockEntries(sizes.map((size) => ({ size, qty: 0 })));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach((f) => {
      const r = new FileReader();
      r.onload = () => setImages((p) => [...p, r.result as string]);
      r.readAsDataURL(f);
    });
    e.target.value = '';
  };

  const addUrl = () => {
    if (imageUrl.trim()) {
      setImages((p) => [...p, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const validSizes = stockEntries.filter((e) => String(e.size).trim() !== '');

  const handleSave = () => {
    onSave(product.id, {
      name,
      description,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      category,
      featured,
      isPromo,
      images,
      sizes: validSizes.map((e) => String(e.size).trim()),
      stock: validSizes.map((e) => ({
        ...e,
        size: String(e.size).trim(),
        qty: Number(e.qty) || 0,
      })),
      inStock: validSizes.some((e) => Number(e.qty) > 0),
    });
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="h-8 w-8 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm border border-border flex items-center justify-center text-muted-foreground hover:bg-white transition-colors"
        title="Editar producto"
      >
        <Pencil className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="font-display text-xl font-semibold mb-6 pr-8">
              Editar producto
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Imágenes
                </label>

                <div className="flex flex-wrap gap-2 mb-3">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative h-20 w-20 rounded-xl overflow-hidden border border-border bg-muted"
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImages((p) => p.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/70 text-white flex items-center justify-center"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="h-20 w-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-black"
                  >
                    <ImagePlus className="h-5 w-5" />
                  </button>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFile}
                    className="hidden"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Pega una URL de imagen"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={addUrl}
                    className="px-4 py-2 rounded-xl bg-muted text-sm font-medium hover:bg-accent transition-colors"
                  >
                    + URL
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Nombre
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Descripción
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:border-black min-h-[90px] resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Precio
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-black tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Precio anterior
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="Opcional"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-black tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Categoría
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`h-10 px-4 rounded-xl text-sm font-medium transition-colors ${
                        category === cat.id
                          ? 'bg-black text-white'
                          : 'bg-muted text-foreground hover:bg-accent'
                      }`}
                    >
                      {cat.emoji && `${cat.emoji} `}
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-3">
                  Plantilla de tallas
                </label>

                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => applyPreset(SIZE_PRESETS.numeric_0_10)}
                    className="h-10 px-4 rounded-xl bg-muted text-sm font-medium hover:bg-accent transition-colors"
                  >
                    0 a 10
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset(SIZE_PRESETS.letters_xs_xxl)}
                    className="h-10 px-4 rounded-xl bg-muted text-sm font-medium hover:bg-accent transition-colors"
                  >
                    XS a XXL
                  </button>

                  <button
                    type="button"
                    onClick={addSzRow}
                    className="h-10 px-4 rounded-xl bg-muted text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Agregar manual
                  </button>
                </div>

                <label className="text-sm font-medium text-foreground block mb-2">
                  Inventario por talla
                </label>

                <div className="space-y-2">
                  {stockEntries.map((e, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        value={String(e.size)}
                        onChange={(ev) => updSzRow(i, 'size', ev.target.value)}
                        placeholder="Talla"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-black"
                      />

                      <input
                        type="number"
                        min="0"
                        value={e.qty}
                        onChange={(ev) =>
                          updSzRow(i, 'qty', parseInt(ev.target.value) || 0)
                        }
                        className={`w-20 px-3 py-2.5 rounded-xl border text-sm outline-none text-center ${
                          e.qty === 0
                            ? 'border-orange-300 bg-orange-50 text-orange-700'
                            : 'border-border bg-background focus:border-black'
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => rmSzRow(i)}
                        className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addSzRow}
                    className="w-full h-10 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-black hover:text-black transition-colors"
                  >
                    + Agregar talla
                  </button>
                </div>

                {stockEntries.some((e) => e.qty === 0 && e.size) && (
                  <p className="text-xs text-orange-600 mt-2">
                    ⚠️ Tallas con 0 aparecerán como agotadas
                  </p>
                )}
              </div>

              <div className="flex gap-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded accent-black"
                  />
                  <span className="text-sm font-medium">Destacado</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPromo}
                    onChange={(e) => setIsPromo(e.target.checked)}
                    className="w-4 h-4 rounded accent-black"
                  />
                  <span className="text-sm font-medium">En promoción</span>
                </label>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 h-11 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleSave}
                  className="flex-1 h-11 rounded-xl bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}