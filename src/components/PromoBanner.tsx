import { useEffect, useState } from 'react';

const promos = [
  "🔥 Hot Sale - Hasta 30% OFF",
  "⚽ Final del fútbol - Promos especiales",
  "🐾 2x1 en accesorios seleccionados",
];

export function PromoBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black text-white text-center py-2 text-sm font-medium">
      {promos[index]}
    </div>
  );
}