# Manada Haus — Catálogo de Accesorios para Mascotas

Proyecto React + Vite + TypeScript + Tailwind CSS.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Build para producción

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
├── components/
│   ├── AdminLogin.tsx          # Login modal del administrador
│   ├── AddProductDialog.tsx    # Dialog para agregar productos
│   ├── ManageCategoriesDialog.tsx  # Dialog para gestionar categorías
│   ├── ProductCard.tsx         # Tarjeta de producto con galería
│   ├── ProductDetailSheet.tsx  # Sheet lateral de detalle de producto
│   ├── ServicesSection.tsx     # Sección "Próximamente"
│   ├── TrustSection.tsx        # Barra de confianza (envíos, calidad, etc.)
│   └── LogoSVG.tsx             # Logo SVG inline
├── lib/
│   ├── types.ts                # Tipos TypeScript
│   ├── utils.ts                # Utilidades (cn)
│   ├── products-store.ts       # CRUD de productos (localStorage)
│   ├── categories-store.ts     # CRUD de categorías (localStorage)
│   └── placeholder-images.ts  # Imágenes de ejemplo como data URIs
└── pages/
    └── Index.tsx               # Página principal
```

## Personalización

### Cambiar contraseña de admin
En `src/components/AdminLogin.tsx`, línea 3:
```ts
const ADMIN_PASSWORD = 'mascota2024'; // ← cambia esto
```

### Cambiar número de WhatsApp
En `src/pages/Index.tsx`, busca y reemplaza:
```
https://wa.me/5215512345678
```

### Agregar tu logo real
Reemplaza el componente `<LogoSVG>` en `src/pages/Index.tsx` por:
```tsx
import logo from '@/assets/logo-manada-haus.png';
// ...
<img src={logo} alt="Manada Haus" className="h-48 sm:h-72 lg:h-96 w-auto object-contain" />
```

### Agregar imágenes de productos reales
En `src/lib/products-store.ts`, reemplaza los imports de `placeholder-images` por:
```ts
import sampleCollar from '@/assets/sample-collar.jpg';
// etc.
```

## Tecnologías

- [React 18](https://react.dev)
- [Vite 5](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 3](https://tailwindcss.com)
- [Lucide React](https://lucide.dev)
