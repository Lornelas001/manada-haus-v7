import { Truck, ShieldCheck, Ruler, Heart } from 'lucide-react';

const trustItems = [
  {
    icon: Ruler,
    label: 'Medido para encajar',
  },
  {
    icon: ShieldCheck,
    label: 'Materiales premium',
  },
  {
    icon: Truck,
    label: 'Envíos a todo México',
  },
  {
    icon: Heart,
    label: 'Hecho con amor',
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-[#e8e8e8] bg-[#f3f3f3]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center sm:text-left"
            >
              <item.icon className="h-4 w-4 text-[#8a8a8a] shrink-0" />

              <span className="text-sm font-normal uppercase tracking-wide text-[#6f6f6f] leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}