import { Scissors, Dog, Heart, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';

type ServiceItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  visible: boolean;
};

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'estetica',
    icon: '✂️',
    title: 'Estética canina y felina',
    description: 'Baño, corte y tratamientos especiales para tu mascota.',
    visible: true,
  },
  {
    id: 'paseo',
    icon: '🐘',
    title: 'Paseo de perros',
    description: 'Paseos diarios con cuidadores certificados.',
    visible: false,
  },
  {
    id: 'guarderia',
    icon: '🏠',
    title: 'Guardería de día',
    description: 'Cuidado profesional y socialización garantizada.',
    visible: true,
  },
  {
    id: 'veterinaria',
    icon: '🩺',
    title: 'Asesoría veterinaria',
    description: 'Consultas en línea con veterinarios certificados.',
    visible: true,
  },
];

const STORAGE_KEY = 'manada-services-visibility';

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-8 w-14 rounded-full transition-colors ${
        checked ? 'bg-black' : 'bg-black/10'
      }`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${
          checked ? 'left-7' : 'left-1'
        }`}
      />
    </button>
  );
}

export function ServicesSection({ isAdmin = false }: { isAdmin?: boolean }) {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed: ServiceItem[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) {
        setServices(parsed);
      }
    } catch {
      // ignore malformed localStorage
    }
  }, []);

  const updateServices = (next: ServiceItem[]) => {
    setServices(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggleService = (id: string) => {
    const next = services.map((service) =>
      service.id === id ? { ...service, visible: !service.visible } : service
    );
    updateServices(next);
  };

  const visibleServices = services.filter((service) => service.visible);

  if (!isAdmin && visibleServices.length === 0) return null;

  return (
    <section className="border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            Servicios
          </h2>

          {isAdmin && (
            <div className="inline-flex rounded-full bg-white/70 px-4 py-2 text-sm text-muted-foreground border border-border">
              Modo admin — activa/desactiva servicios
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {(isAdmin ? services : visibleServices).map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl border p-5 shadow-sm transition-all ${
                service.visible
                  ? 'bg-white border-border'
                  : 'bg-white/40 border-border opacity-45'
              }`}
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="text-4xl leading-none">{service.icon}</div>

                {isAdmin && (
                  <Toggle
                    checked={service.visible}
                    onChange={() => toggleService(service.id)}
                  />
                )}
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 leading-snug">
                {service.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-7 mb-4">
                {service.description}
              </p>

              {isAdmin && (
                <p
                  className={`text-sm ${
                    service.visible ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {service.visible ? '• Visible' : '◦ Oculto'}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}