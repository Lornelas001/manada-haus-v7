import { Product } from '@/lib/types';
import { useEffect, useState } from 'react';
import { ShoppingBag, Trash2, X, Star } from 'lucide-react';
import { addRating, recordSale } from '@/lib/products-store';

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              (hover || value) >= n
                ? 'fill-amber-400 text-amber-400'
                : 'text-muted-foreground/30'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

interface ProductDetailSheetProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: (id: string) => void;
  onProductUpdated?: (id: string) => void;
  getCategoryLabel?: (catId: string) => string;
  onAddToCart?: (item: {
    productId: string;
    name: string;
    price: number;
    image?: string;
    size?: string;
  }) => void;
}

export function ProductDetailSheet({
  product,
  open,
  onOpenChange,
  onDelete,
  onProductUpdated,
  getCategoryLabel,
  onAddToCart,
}: ProductDetailSheetProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [ratingDone, setRatingDone] = useState(false);

  useEffect(() => {
    if (!open || !product) return;
    setSelectedSize(null);
    setCurrentImage(0);
  }, [open, product]);

  if (!product) return null;

  const stockMap = Object.fromEntries(
  (product.stock || []).map((e) => [String(e.size).trim(), Number(e.qty)])
  );
  const ratings = product.ratings || [];
  const avgRating = ratings.length
    ? ratings.reduce((s, r) => s + r.stars, 0) / ratings.length
    : 0;

  const waMsg = encodeURIComponent(
    `Hola! Me interesa: *${product.name}*\nPrecio: $${product.price.toFixed(2)}${
      selectedSize ? `\nTalla: ${selectedSize}` : ''
    }\n¿Está disponible?`
  );

  const handleWaClick = () =>
    recordSale(product.id, product.name, product.price, selectedSize || '');

  const handleAddToCart = () => {
    onAddToCart?.({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      size: selectedSize || undefined,
    });
  };

  const handleRating = () => {
    if (ratingStars === 0) return;

    addRating(product.id, ratingStars, ratingComment);
    setRatingStars(0);
    setRatingComment('');
    setRatingDone(true);

    setTimeout(() => setRatingDone(false), 3000);

    onProductUpdated?.(product.id);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => onOpenChange(false)}
      />

      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg bg-white rounded-t-3xl overflow-y-auto max-h-[92vh] transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
        </div>

        <div className="px-6 pb-10 relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-1 right-0 h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {product.isPromo && product.originalPrice && (
            <div className="inline-flex items-center gap-1 bg-red-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              PROMO {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-5 pr-10 leading-snug">
            {product.name}
          </h2>

          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted border border-border mb-4">
            <img
              src={product.images[currentImage] || ''}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 mb-5">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`h-16 w-16 rounded-xl overflow-hidden border transition-all ${
                    i === currentImage
                      ? 'border-black ring-2 ring-black/20'
                      : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">
                ${product.price.toFixed(2)}
              </span>

              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <span className="text-xs text-muted-foreground">
              {getCategoryLabel ? getCategoryLabel(product.category) : product.category}
            </span>
          </div>

          {avgRating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-amber-400">{'★'.repeat(Math.round(avgRating))}</span>
              <span className="text-xs text-muted-foreground">
                {avgRating.toFixed(1)} ({ratings.length})
              </span>
            </div>
          )}

          <p className="text-base leading-relaxed text-muted-foreground mb-6">
            {product.description}
          </p>

          {product.sizes.length > 0 && (
            <div className="mb-6">
              <span className="text-sm font-medium block mb-3">Talla</span>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const sizeKey = String(size).trim();
                  const qty = Number(stockMap[sizeKey] ?? 0);
                  const isOut = qty <= 0;

                  return (
                    <button
                      key={sizeKey}
                      onClick={() => !isOut && setSelectedSize(sizeKey)}
                      disabled={isOut}
                      className={`h-11 min-w-[2.8rem] px-4 rounded-xl text-sm font-medium transition-all ${
                        selectedSize === sizeKey
                          ? 'bg-black text-white'
                          : isOut
                          ? 'bg-muted text-muted-foreground/40 line-through'
                          : 'bg-muted hover:bg-accent'
                      }`}
                    >
                      {sizeKey}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full h-12 rounded-xl bg-black text-white font-medium mb-3 hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Agregar al carrito
          </button>

          <a
            href={`https://wa.me/5215512345678?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWaClick}
            className="w-full h-12 rounded-xl flex items-center justify-center text-white font-medium mb-3 transition-all hover:opacity-95"
            style={{
              background: '#25D366',
              boxShadow: '0 6px 18px rgba(37,211,102,.25)',
            }}
          >
            Consultar disponibilidad
          </a>

          <p className="text-center text-xs text-muted-foreground mb-6">
            Te responderemos a la brevedad
          </p>

          <div className="border-t border-border pt-5">
            <span className="text-sm font-medium block mb-3">Reseñas</span>

            {ratings.length > 0 && (
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {ratings.map((r) => (
                  <div key={r.id} className="bg-muted/40 rounded-xl p-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-amber-400 text-sm">
                        {'★'.repeat(r.stars)}
                      </span>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>

                    {r.comment && (
                      <p className="text-sm text-foreground/80">{r.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {ratingDone ? (
              <p className="text-sm text-green-600 text-center py-2">
                ¡Gracias por tu reseña! ⭐
              </p>
            ) : (
              <div className="bg-muted/30 rounded-2xl p-4">
                <StarPicker value={ratingStars} onChange={setRatingStars} />

                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Cuéntanos tu experiencia..."
                  className="w-full mt-3 px-3 py-2 rounded-xl border border-border bg-white text-sm outline-none resize-none min-h-[70px]"
                />

                <button
                  onClick={handleRating}
                  disabled={ratingStars === 0}
                  className="w-full mt-3 h-10 rounded-xl bg-black text-white text-sm font-medium disabled:opacity-40"
                >
                  Enviar reseña
                </button>
              </div>
            )}
          </div>

          {onDelete && (
            <button
              onClick={() => {
                onDelete(product.id);
                onOpenChange(false);
              }}
              className="w-full flex items-center justify-center gap-2 text-destructive mt-5 text-sm"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar producto
            </button>
          )}
        </div>
      </div>
    </>
  );
}