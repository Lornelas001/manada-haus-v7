import { useState, useMemo, useCallback } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailSheet } from '@/components/ProductDetailSheet';
import { AddProductDialog } from '@/components/AddProductDialog';
import { ManageCategoriesDialog } from '@/components/ManageCategoriesDialog';
import { AdminLogin } from '@/components/AdminLogin';
import { PromotionsSection } from '@/components/PromotionsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TrustSection } from '@/components/TrustSection';
import logo from '../assets/logo-manada-haus.png';
import { MiniCart, CartItem } from '@/components/MiniCart';
import { getProducts, addProduct, deleteProduct, updateProduct } from '@/lib/products-store';
import { getCategories, addCategory, deleteCategory } from '@/lib/categories-store';
import { Product, ProductCategoryItem } from '@/lib/types';
import { MessageCircle, Instagram, Facebook, TrendingUp } from 'lucide-react';
import { EditProductDialog } from '@/components/EditProductDialog';
import { StatsPanel } from '@/components/StatsPanel';

// TikTok icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.27 8.27 0 004.76 1.5V7.12a4.83 4.83 0 01-1-.43z" />
    </svg>
  );
}

export default function Index() {
  const [products, setProducts] = useState<Product[]>(getProducts);
  const [categories, setCategories] = useState<ProductCategoryItem[]>(getCategories);
  const [filter, setFilter] = useState<string>('todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const reload = useCallback(() => setProducts(getProducts()), []);

  const filtered = useMemo(
    () => (filter === 'todos' ? products : products.filter((p) => p.category === filter)),
    [products, filter]
  );

  const featured = useMemo(() => products.filter((p) => p.featured).slice(0, 3), [products]);

  const handleAdd = (data: Omit<Product, 'id'>) => {
    const newP = addProduct(data);
    setProducts((prev) => [...prev, newP]);
  };

  const handleUpdate = (id: string, updates: Partial<Product>) => {
    updateProduct(id, updates);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleProductUpdated = (id: string) => {
    reload();
    const fresh = getProducts().find((p) => p.id === id);
    if (fresh) setSelectedProduct(fresh);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddCategory = (label: string, emoji?: string) => {
    const newCat = addCategory(label, emoji);
    setCategories((prev) => [...prev, newCat]);
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    if (filter === id) setFilter('todos');
  };

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  const getCategoryLabel = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? `${cat.emoji ? `${cat.emoji} ` : ''}${cat.label}` : catId;
  };

  const handleAddToCart = (item: {
    productId: string;
    name: string;
    price: number;
    image?: string;
    size?: string;
  }) => {
    const cartId = `${item.productId}-${item.size || 'sin-talla'}`;

    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === cartId);

      if (existing) {
        return prev.map((p) =>
          p.id === cartId ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      return [
        ...prev,
        {
          id: cartId,
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  const increaseCartItem = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseCartItem = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header
        className="relative overflow-hidden border-b border-border"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)' }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-10 sm:pb-12">
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {isAdmin && (
              <button
                onClick={() => setShowStats(true)}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-medium text-muted-foreground bg-white border border-border hover:bg-accent transition-colors"
              >
                <TrendingUp className="h-3.5 w-3.5" />
                Estadísticas
              </button>
            )}

            <AdminLogin
              isAdmin={isAdmin}
              onLogin={() => setIsAdmin(true)}
              onLogout={() => setIsAdmin(false)}
            />

            {isAdmin && <AddProductDialog categories={categories} onAdd={handleAdd} />}
          </div>

          <div className="flex flex-col items-center text-center gap-5 sm:gap-6">
            <img
              src={logo}
              alt="Manada Haus"
              className="h-28 sm:h-36 lg:h-44 w-auto object-contain"
            />

            <div className="max-w-2xl space-y-4">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-tight">
                Estilo para quienes caminan contigo
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                En MANADA HAUS creemos que el estilo no termina en ti. Se extiende a ese amigo que camina a tu lado 🐾
                <br />
                Accesorios para perros, gatos y cualquier mascota que esté en tu corazón ❤️
              </p>
            </div>

            <a
              href="https://wa.me/525652074499"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[hsl(142,70%,45%)] px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[hsl(142,70%,40%)] hover:shadow-xl"
            >
              <MessageCircle className="h-5 w-5" />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </header>

      <PromotionsSection isAdmin={isAdmin} />

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Destacados
            </h2>

            <button
              onClick={() => {
                setFilter('todos');
                document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Ver todo →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
            {featured.map((product, i) => (
              <div
                key={product.id}
                className="relative animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'backwards' }}
              >
                <ProductCard product={product} onClick={openDetail} />
                {isAdmin && (
                  <div className="absolute top-2 right-2 z-10">
                    <EditProductDialog
                      product={product}
                      categories={categories}
                      onSave={handleUpdate}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <TrustSection />

      <section id="catalogo" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-5">
        <h2 className="mb-4 font-display text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Catálogo
        </h2>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setFilter('todos')}
            className={`h-9 rounded-full px-4 text-sm font-medium transition-all duration-200 ${
              filter === 'todos'
                ? 'bg-black text-white'
                : 'border border-border bg-white text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Todos
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`h-9 rounded-full px-4 text-sm font-medium transition-all duration-200 ${
                filter === cat.id
                  ? 'bg-black text-white'
                  : 'border border-border bg-white text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {cat.emoji && `${cat.emoji} `}
              {cat.label}
            </button>
          ))}

          {isAdmin && (
            <ManageCategoriesDialog
              categories={categories}
              onAdd={handleAddCategory}
              onDelete={handleDeleteCategory}
            />
          )}
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base text-muted-foreground">
              No hay productos en esta categoría.
            </p>

            {isAdmin && (
              <p className="mt-1 text-sm text-muted-foreground">
                Agrega tu primer producto con el botón de arriba.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="relative animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'backwards' }}
              >
                <ProductCard product={product} onClick={openDetail} />
                {isAdmin && (
                  <div className="absolute top-2 right-2 z-10">
                    <EditProductDialog
                      product={product}
                      categories={categories}
                      onSave={handleUpdate}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* <ServicesSection isAdmin={isAdmin} /> */}

      <footer className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col items-center sm:items-start gap-3">
              <img
                src={logo}
                alt="Manada Haus"
                className="h-10 w-auto object-contain brightness-0 invert"
              />

              <p className="text-sm text-white/70">
                © {new Date().getFullYear()} Manada Haus. Todos los derechos reservados.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/manadahaus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://facebook.com/manadahaus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://tiktok.com/@manadahaus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>

              <a
                href="https://wa.me/525652074499"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ProductDetailSheet
        product={selectedProduct}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onDelete={isAdmin ? handleDelete : undefined}
        onProductUpdated={handleProductUpdated}
        getCategoryLabel={getCategoryLabel}
        onAddToCart={handleAddToCart}
      />

      {showStats && <StatsPanel onClose={() => setShowStats(false)} />}

      <MiniCart
        items={cartItems}
        open={cartOpen}
        onOpenChange={setCartOpen}
        onIncrease={increaseCartItem}
        onDecrease={decreaseCartItem}
        onRemove={removeCartItem}
        whatsappNumber="525652074499"
      />
    </div>
  );
}