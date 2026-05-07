import { Product } from '@/lib/types';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const hasMultiple = product.images.length > 1;

  const avgRating = product.ratings?.length
    ? product.ratings.reduce((s, r) => s + r.stars, 0) / product.ratings.length
    : 0;

  const totalStock = (product.stock || []).reduce((s, e) => s + e.qty, 0);
  const isLowStock = totalStock > 0 && totalStock <= 5;

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % product.images.length);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <button
      onClick={() => onClick(product)}
      className="group relative w-full overflow-hidden rounded-2xl bg-white border border-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left"
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.images[currentImg] ? (
          <img
            src={product.images[currentImg]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Sin imagen
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isPromo && (
            <span className="bg-red-500/90 text-white text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
              PROMO
            </span>
          )}

          {isLowStock && (
            <span className="bg-orange-400/90 text-white text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
              Últimas piezas
            </span>
          )}

          {!product.inStock && (
            <span className="bg-black/60 text-white text-[10px] font-medium px-2 py-1 rounded-full backdrop-blur-sm">
              Agotado
            </span>
          )}
        </div>

        {/* Flechas */}
        {hasMultiple && (
          <>
            <div
              role="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </div>

            <div
              role="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </div>
          </>
        )}

        {/* Indicadores */}
        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === currentImg ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-4">
        <h3 className="text-sm sm:text-base font-medium text-foreground leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-foreground tabular-nums">
              ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            </span>

            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through tabular-nums">
                ${product.originalPrice.toLocaleString('es-MX')}
              </span>
            )}
          </div>

          {avgRating > 0 && (
            <span className="text-xs font-medium text-amber-500">
              ★ {avgRating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}