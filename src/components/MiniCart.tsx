import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string;
  size?: string;
  quantity: number;
}

interface MiniCartProps {
  items: CartItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  whatsappNumber: string;
}

export function MiniCart({
  items,
  open,
  onOpenChange,
  onIncrease,
  onDecrease,
  onRemove,
  whatsappNumber,
}: MiniCartProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = encodeURIComponent(
    [
      'Hola, quiero hacer este pedido en Manada Haus 🐾',
      '',
      ...items.map(
        (item, index) =>
          `${index + 1}. ${item.name}${item.size ? ` - Talla: ${item.size}` : ''} x${item.quantity} — $${(
            item.price * item.quantity
          ).toFixed(2)}`
      ),
      '',
      `Total de piezas: ${totalItems}`,
      `Total a pagar: $${totalPrice.toFixed(2)}`,
      '',
      '¿Me apoyan con disponibilidad y pago?'
    ].join('\n')
  );

  if (!items.length) return null;

  return (
    <>
      <button
        onClick={() => onOpenChange(true)}
        className="fixed bottom-5 right-5 z-[60] h-14 rounded-full bg-black text-white px-5 shadow-xl flex items-center gap-3 hover:bg-black/90 transition-colors"
      >
        <ShoppingBag className="h-5 w-5" />
        <span className="text-sm font-medium">{totalItems} en carrito</span>
      </button>

      <div
        className={`fixed inset-0 z-[70] bg-black/50 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => onOpenChange(false)}
      />

      <div
        className={`fixed right-0 top-0 z-[71] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">Tu carrito</h3>
            <p className="text-sm text-muted-foreground">{totalItems} producto(s)</p>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex h-[calc(100%-88px)] flex-col">
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border p-3 bg-white">
                <div className="flex gap-3">
                  <div className="h-20 w-20 overflow-hidden rounded-xl bg-muted shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : null}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground leading-snug">{item.name}</h4>
                    {item.size && (
                      <p className="text-xs text-muted-foreground mt-1">Talla: {item.size}</p>
                    )}
                    <p className="text-sm font-semibold text-foreground mt-2">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecrease(item.id)}
                          className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>

                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>

                        <button
                          onClick={() => onIncrease(item.id)}
                          className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(item.id)}
                        className="h-8 w-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold text-foreground">${totalPrice.toFixed(2)}</span>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-xl bg-[#25D366] text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar pedido por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}