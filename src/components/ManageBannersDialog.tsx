import { useState } from 'react';
import { Image as ImageIcon, X, Pencil, Save, Trash2 } from 'lucide-react';
import { Banner } from '@/lib/banners-store';

interface ManageBannersDialogProps {
  banners: Banner[];
  onAdd: (b: Omit<Banner, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Banner>) => void;
  onDelete: (id: string) => void;
}

const emptyDraft: Omit<Banner, 'id'> = {
  title: '',
  subtitle: '',
  ctaText: '',
  ctaLink: '#catalogo',
  imageUrl: '',
  imageFit: 'cover',
  gradientFrom: 'from-black/70',
  active: true,
  sortOrder: 0,
};

function BannerForm({
  draft,
  setDraft,
}: {
  draft: Omit<Banner, 'id'>;
  setDraft: (d: Omit<Banner, 'id'>) => void;
}) {
  return (
    <div className="space-y-2.5">
      <input
        value={draft.imageUrl}
        onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value })}
        placeholder="URL de la imagen (https://...)"
        className="w-full px-3.5 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-black transition-colors"
      />

      <div className="flex gap-2">
        <input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="Título (opcional)"
          className="flex-1 px-3.5 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-black transition-colors"
        />
        <input
          value={draft.subtitle}
          onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
          placeholder="Subtítulo (opcional)"
          className="flex-1 px-3.5 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-black transition-colors"
        />
      </div>

      <div className="flex gap-2">
        <input
          value={draft.ctaText}
          onChange={(e) => setDraft({ ...draft, ctaText: e.target.value })}
          placeholder="Texto del botón (opcional)"
          className="flex-1 px-3.5 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-black transition-colors"
        />
        <input
          value={draft.ctaLink}
          onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })}
          placeholder="Link del botón"
          className="flex-1 px-3.5 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-black transition-colors"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span>Encuadre:</span>
          <select
            value={draft.imageFit}
            onChange={(e) =>
              setDraft({ ...draft, imageFit: e.target.value as 'cover' | 'contain' })
            }
            className="px-2 py-1.5 rounded-lg border border-border bg-background text-xs outline-none"
          >
            <option value="cover">Rellenar (recorta)</option>
            <option value="contain">Completa (sin recortar)</option>
          </select>
        </label>

        <label className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span>Orden:</span>
          <input
            type="number"
            value={draft.sortOrder}
            onChange={(e) => setDraft({ ...draft, sortOrder: Number(e.target.value) || 0 })}
            className="w-16 px-2 py-1.5 rounded-lg border border-border bg-background text-xs outline-none"
          />
        </label>

        <label className="text-xs text-muted-foreground flex items-center gap-1.5 ml-auto">
          <input
            type="checkbox"
            checked={draft.active}
            onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
          />
          <span>Visible en el sitio</span>
        </label>
      </div>
    </div>
  );
}

export function ManageBannersDialog({
  banners,
  onAdd,
  onUpdate,
  onDelete,
}: ManageBannersDialogProps) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Omit<Banner, 'id'> | null>(null);
  const [newDraft, setNewDraft] = useState<Omit<Banner, 'id'>>({
    ...emptyDraft,
    sortOrder: banners.length + 1,
  });
  const [showNewForm, setShowNewForm] = useState(false);

  const startEdit = (b: Banner) => {
    setEditingId(b.id);
    setEditDraft({ ...b });
  };

  const saveEdit = () => {
    if (!editingId || !editDraft) return;
    onUpdate(editingId, editDraft);
    setEditingId(null);
    setEditDraft(null);
  };

  const handleAddNew = () => {
    if (!newDraft.imageUrl.trim()) return;
    onAdd(newDraft);
    setNewDraft({ ...emptyDraft, sortOrder: banners.length + 2 });
    setShowNewForm(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-medium text-muted-foreground bg-white border border-border hover:bg-accent transition-colors"
      >
        <ImageIcon className="h-3.5 w-3.5" />
        Banners
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-card rounded-xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="font-display text-lg font-semibold mb-5 pr-8">
              Gestionar banners
            </h2>

            <div className="space-y-3 mb-5">
              {banners.length === 0 && (
                <p className="text-sm text-muted-foreground">Todavía no tienes banners.</p>
              )}

              {banners.map((b) => {
                const isEditing = editingId === b.id && editDraft;

                return (
                  <div key={b.id} className="rounded-xl border border-border p-3.5">
                    {isEditing ? (
                      <div className="space-y-3">
                        <BannerForm draft={editDraft} setDraft={setEditDraft} />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditDraft(null);
                            }}
                            className="h-8 px-3 rounded-lg border border-border text-xs font-medium hover:bg-accent transition-colors"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={saveEdit}
                            className="h-8 px-3 rounded-lg bg-black text-white text-xs font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                          >
                            <Save className="h-3.5 w-3.5" />
                            Guardar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <img
                          src={b.imageUrl}
                          alt=""
                          className="h-14 w-24 object-cover rounded-lg border border-border shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {b.title || <span className="text-muted-foreground italic">Sin título</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Orden {b.sortOrder} · {b.imageFit === 'contain' ? 'Completa' : 'Rellenar'} ·{' '}
                            {b.active ? 'Visible' : 'Oculto'}
                          </p>
                        </div>
                        <button
                          onClick={() => startEdit(b)}
                          className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors shrink-0"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(b.id)}
                          className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {showNewForm ? (
              <div className="rounded-xl border border-dashed border-border p-3.5 space-y-3">
                <BannerForm draft={newDraft} setDraft={setNewDraft} />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowNewForm(false)}
                    className="h-8 px-3 rounded-lg border border-border text-xs font-medium hover:bg-accent transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddNew}
                    className="h-8 px-3 rounded-lg bg-black text-white text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    + Agregar banner
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowNewForm(true)}
                className="w-full h-10 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                + Agregar nuevo banner
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
