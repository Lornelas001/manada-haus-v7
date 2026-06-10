// src/components/PromoBanners.tsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PromoBannerCard {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  gradientFrom?: string;
}

const banners: PromoBannerCard[] = [
      {
    id: 'gana-mundial',
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '#catalogo',
    imageUrl: 'https://i.ibb.co/sYF612h/Whats-App-Image-2026-06-10-at-12-55-51-AM.jpg',
  },



      {
    id: 'envios-50',
    title: 'Envíos en $50',
    subtitle: 'Hasta el 15 de junio',
    ctaText: 'Comprar ahora',
    ctaLink: '#catalogo',
    imageUrl: 'https://i.ibb.co/Q78bzKYf/download-5.png',
    gradientFrom: 'from-black/70',
  },


];

export function PromoBanners() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  const banner = banners[current];

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative overflow-hidden rounded-2xl h-[220px] sm:h-[280px] lg:h-[340px] shadow-lg">

        {/* Imagen de fondo */}
        {banner.imageUrl ? (
          <img
            key={banner.id}
            src={banner.imageUrl}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
        ) : (
          // Placeholder de color cuando no hay imagen
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              banner.id === 'futbol'
                ? 'bg-gradient-to-r from-green-800 to-green-600'
                : 'bg-gradient-to-r from-orange-600 to-red-500'
            }`}
          />
        )}

        {/* Overlay gradiente para legibilidad del texto */}
        <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradientFrom} via-black/30 to-transparent`} />

        {/* Contenido */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-12 max-w-md">
          <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2 drop-shadow-md">
            {banner.title}
          </h2>
          <p className="text-white/85 text-sm sm:text-base mb-5 drop-shadow-sm">
            {banner.subtitle}
          </p>
          <a
            href={banner.ctaLink}
            className="inline-flex items-center gap-1.5 self-start bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors shadow-md"
          >
            {banner.ctaText} →
          </a>
        </div>

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
      </div>
    </section>
  );
}