import { useEffect, useState } from 'react';
import { Pencil, Save, X } from 'lucide-react';

type PromotionItem = {
  id: string;
  title: string;
  description: string;
  badge?: string;
  cta?: string;
  visible: boolean;
};

const DEFAULT_PROMOTIONS: PromotionItem[] = [
  {
    id: 'buen-fin',
    title: 'Buen Fin',
    description: 'Aprovecha descuentos especiales en productos seleccionados durante esta temporada.',
    badge: 'Por tiempo limitado',
    cta: 'Ver catálogo',
    visible: true,
  },
  {
    id: 'envio-gratis',
    title: 'Envío gratis',
    description: 'Recibe envío gratis en compras mínimas participantes.',
    badge: 'Promo especial',
    cta: 'Comprar ahora',
    visible: true,
  },
  {
    id: 'producto-oferta',
    title: 'Producto en oferta',
    description: 'Encuentra modelos seleccionados con precio especial por tiempo limitado.',
    badge: 'Oferta',
    cta: 'Ver productos',
    visible: true,
  },
];

const STORAGE_KEY = 'manada-promotions';

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

export function PromotionsSection({ isAdmin = false }: { isAdmin?: boolean }) {
  const [promotions, setPromotions] = useState<PromotionItem[]>(DEFAULT_PROMOTIONS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<PromotionItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed: PromotionItem[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) {
        setPromotions(parsed);
      }
    } catch {
      // ignore malformed localStorage
    }
  }, []);

  const updatePromotions = (next: PromotionItem[]) => {
    setPromotions(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const togglePromotion = (id: string) => {
    const next = promotions.map((promo) =>
      promo.id === id ? { ...promo, visible: !promo.visible } : promo
    );
    updatePromotions(next);
  };

  const startEdit = (promo: PromotionItem) => {
    setEditingId(promo.id);
    setDraft({ ...promo });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const saveEdit = () => {
    if (!draft) return;

    const next = promotions.map((promo) =>
      promo.id === draft.id ? draft : promo
    );

    updatePromotions(next);
    setEditingId(null);
    setDraft(null);
  };

  const visiblePromotions = promotions.filter((promo) => promo.visible);

  if (!isAdmin && visiblePromotions.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            Promociones
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Aprovecha nuestras promociones vigentes y consiente a tu mascota.
          </p>
        </div>

        {isAdmin && (
          <div className="inline-flex rounded-full bg-white border border-border px-4 py-2 text-sm text-muted-foreground">
            Modo admin — edita y activa promociones
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {(isAdmin ? promotions : visiblePromotions).map((promo) => {
          const isEditing = editingId === promo.id && draft;

          return (
            <div
              key={promo.id}
              className={`rounded-2xl border p-5 shadow-sm h-full flex flex-col transition-all ${
                promo.visible
                  ? 'bg-white border-border'
                  : 'bg-white/40 border-border opacity-45'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                {isEditing ? (
                  <input
                    value={draft.badge || ''}
                    onChange={(e) =>
                      setDraft({ ...draft, badge: e.target.value })
                    }
                    placeholder="Badge"
                    className="w-full max-w-[170px] px-3 py-2 rounded-xl border border-border text-xs outline-none"
                  />
                ) : promo.badge ? (
                  <span className="inline-flex rounded-full bg-black text-white text-xs font-medium px-3 py-1">
                    {promo.badge}
                  </span>
                ) : (
                  <span />
                )}

                {isAdmin && !isEditing && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(promo)}
                      className="h-9 w-9 rounded-xl border border-border flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <Toggle
                      checked={promo.visible}
                      onChange={() => togglePromotion(promo.id)}
                    />
                  </div>
                )}

                {isAdmin && isEditing && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={saveEdit}
                      className="h-9 w-9 rounded-xl bg-black text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="h-9 w-9 rounded-xl border border-border flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <>
                  <input
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                    placeholder="Título"
                    className="w-full px-4 py-3 rounded-xl border border-border text-base font-medium mb-3 outline-none"
                  />

                  <textarea
                    value={draft.description}
                    onChange={(e) =>
                      setDraft({ ...draft, description: e.target.value })
                    }
                    placeholder="Descripción"
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm min-h-[110px] outline-none resize-none mb-3"
                  />

                  <input
                    value={draft.cta || ''}
                    onChange={(e) =>
                      setDraft({ ...draft, cta: e.target.value })
                    }
                    placeholder="Texto del botón"
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none"
                  />
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-foreground mb-3 min-h-[3.5rem]">
                    {promo.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {promo.description}
                  </p>

                  <div className="mt-6">
                    {isAdmin ? (
                      <p
                        className={`text-sm ${
                          promo.visible ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {promo.visible ? '• Visible' : '◦ Oculta'}
                      </p>
                    ) : (
                      promo.cta && (
                        <button
                          type="button"
                          onClick={() => {
                            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="h-10 px-4 rounded-xl bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
                        >
                          {promo.cta}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}