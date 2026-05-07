import { getSales, getProducts } from '@/lib/products-store';
import { X, TrendingUp, AlertTriangle } from 'lucide-react';

export function StatsPanel({ onClose }: { onClose: () => void }) {
  const sales = getSales();
  const products = getProducts();

  const totalRevenue = sales.reduce((s, r) => s + r.price, 0);

  const monthlySales: Record<string, number> = {};
  sales.forEach((s) => {
    const d = new Date(s.date);
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthlySales[k] = (monthlySales[k] || 0) + s.price;
  });

  const months = Object.entries(monthlySales).sort().slice(-6);

  const prodCount: Record<string, { name: string; count: number; revenue: number }> = {};
  sales.forEach((s) => {
    if (!prodCount[s.productId]) {
      prodCount[s.productId] = {
        name: s.productName,
        count: 0,
        revenue: 0,
      };
    }

    prodCount[s.productId].count++;
    prodCount[s.productId].revenue += s.price;
  });

  const topProds = Object.values(prodCount)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const lowStock = products.flatMap((p) =>
    (p.stock || [])
      .filter((e) => e.qty <= 2)
      .map((e) => ({ ...e, product: p.name }))
  );

  const allRatings = products.flatMap((p) => p.ratings || []);
  const avgRating = allRatings.length
    ? (allRatings.reduce((s, r) => s + r.stars, 0) / allRatings.length).toFixed(1)
    : '—';

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-black" />
            Estadísticas
          </h2>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-7">

          {/* KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: 'Ingresos',
                value: `$${totalRevenue.toLocaleString('es-MX', {
                  minimumFractionDigits: 0,
                })}`,
                icon: '💰',
              },
              {
                label: 'Consultas',
                value: sales.length,
                icon: '📦',
              },
              {
                label: 'Calificación',
                value: avgRating,
                icon: '⭐',
              },
              {
                label: 'Productos',
                value: products.length,
                icon: '🏷️',
              },
            ].map((k) => (
              <div
                key={k.label}
                className="bg-muted/40 rounded-2xl p-4 text-center border border-border"
              >
                <div className="text-2xl mb-2">{k.icon}</div>
                <div className="text-xl font-semibold text-foreground">
                  {k.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {k.label}
                </div>
              </div>
            ))}
          </div>

          {/* Ventas por mes */}
          {months.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Consultas por mes</h3>

              <div className="space-y-3">
                {months.map(([month, revenue]) => {
                  const max = Math.max(...months.map((m) => m[1]));

                  return (
                    <div key={month} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-16 shrink-0">
                        {month}
                      </span>

                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-black h-full rounded-full"
                          style={{
                            width: `${max ? (revenue / max) * 100 : 0}%`,
                          }}
                        />
                      </div>

                      <span className="text-xs font-medium w-20 text-right">
                        ${revenue.toLocaleString('es-MX')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Más consultados */}
          {topProds.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Más consultados</h3>

              <div className="space-y-2">
                {topProds.map((p, i) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 bg-muted/30 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm font-bold text-muted-foreground w-5">
                      #{i + 1}
                    </span>

                    <span className="flex-1 text-sm font-medium truncate">
                      {p.name}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {p.count} consulta{p.count !== 1 ? 's' : ''}
                    </span>

                    <span className="text-sm font-semibold text-black">
                      ${p.revenue.toLocaleString('es-MX')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alertas stock */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Alertas de stock
            </h3>

            {lowStock.length === 0 ? (
              <p className="text-sm text-muted-foreground bg-muted rounded-xl px-4 py-3">
                ✅ Todo con stock suficiente
              </p>
            ) : (
              <div className="space-y-2">
                {lowStock.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                      s.qty === 0
                        ? 'bg-red-50 text-red-700'
                        : 'bg-orange-50 text-orange-700'
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {s.product} — talla {s.size}
                    </span>

                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        s.qty === 0 ? 'bg-red-100' : 'bg-orange-100'
                      }`}
                    >
                      {s.qty === 0
                        ? 'AGOTADO'
                        : `${s.qty} restante${s.qty !== 1 ? 's' : ''}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sin ventas */}
          {sales.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-3">
              Las estadísticas se generan cuando los clientes consultan por WhatsApp.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}