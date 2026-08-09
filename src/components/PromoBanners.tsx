// src/components/PromoBanners.tsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Banner, getActiveBanners } from '@/lib/banners-store';

export function PromoBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const active = await getActiveBanners();
      if (cancelled) return;
      setBanners(active);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (banners.length < 2) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (loading || banners.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  const banner = banners[current];

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative overflow-hidden rounded-2xl h-[220px] sm:h-[280px] lg:h-[340px] shadow-lg">

        {/* Imagen de fondo */}
        <>
          {banner.imageFit === 'contain' && (
            // Fondo difuminado para rellenar los espacios cuando la foto no cubre todo el banner
            <img
              src={banner.imageUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
            />
          )}
          <img
            key={banner.id}
            src={banner.imageUrl}
            alt={banner.title}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              banner.imageFit === 'contain' ? 'object-contain' : 'object-cover'
            }`}
          />
        </>

        {/* Overlay gradiente para legibilidad del texto */}
        {banner.gradientFrom && (
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradientFrom} via-black/30 to-transparent`} />
        )}

        {/* Contenido */}
        {(banner.title || banner.subtitle || banner.ctaText) && (
          <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-12 max-w-md">
            {banner.title && (
              <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2 drop-shadow-md">
                {banner.title}
              </h2>
            )}
            {banner.subtitle && (
              <p className="text-white/85 text-sm sm:text-base mb-5 drop-shadow-sm">
                {banner.subtitle}
              </p>
            )}
            {banner.ctaText && (
              <a
                href={banner.ctaLink}
                className="inline-flex items-center gap-1.5 self-start bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors shadow-md"
              >
                {banner.ctaText} →
              </a>
            )}
          </div>
        )}

        {banners.length > 1 && (
          <>
            {/* Flecha izquierda */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Flecha derecha */}
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
                  }`}
                  aria-label={`Ir a slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
