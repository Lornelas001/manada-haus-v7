import { ProductCategoryItem } from '@/lib/types';
import { Settings, X } from 'lucide-react';
import { useState } from 'react';

interface ManageCategoriesDialogProps {
  categories: ProductCategoryItem[];
  onAdd: (label: string, emoji?: string) => void;
  onDelete: (id: string) => void;
}

export function ManageCategoriesDialog({
  categories,
  onAdd,
  onDelete,
}: ManageCategoriesDialogProps) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [emoji, setEmoji] = useState('');

  const handleAdd = () => {
    if (!label.trim()) return;
    onAdd(label.trim(), emoji.trim() || undefined);
    setLabel('');
    setEmoji('');
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-8 px-3.5 rounded-full text-xs font-medium tracking-wide uppercase bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 flex items-center gap-1.5"
      >
        <Settings className="h-3 w-3" />
        Categorías
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-card rounded-xl p-6 w-full max-w-md relative shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="font-display text-lg font-semibold mb-5 pr-8">
              Gestionar categorías
            </h2>

            {/* List */}
            <div className="mb-4">
              {categories.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sin categorías.</p>
              ) : (
                categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
                  >
                    <span className="text-sm">
                      {cat.emoji ? `${cat.emoji} ` : ''}
                      {cat.label}
                    </span>
                    <button
                      onClick={() => onDelete(cat.id)}
                      className="h-7 w-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add new */}
            <div className="flex gap-2 mt-4">
              <input
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                placeholder="🐾"
                className="w-14 text-center px-2 py-2 rounded-lg border border-border bg-background text-lg outline-none focus:border-black transition-colors"
              />
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Nueva categoría"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className="flex-1 px-3.5 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-black transition-colors"
              />
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-lg bg-black text-black-foreground text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                + Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
