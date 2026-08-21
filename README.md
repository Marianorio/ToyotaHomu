# Concesionaria Toyota Formosa

Plataforma web full-stack para una concesionaria automotriz de Formosa, Argentina. Proyecto de **portfolio** (demo): una experiencia digital premium orientada a mostrar vehículos, generar leads y gestionar el negocio desde un panel administrativo (mini-CRM).

> **Aviso de demo:** este sitio es de demostración para portfolio. No es un concesionario oficial Toyota y no usa logos/materiales protegidos con autorización. La información mostrada es ilustrativa. La identidad comercial es 100% configurable y se puede activar/desactivar el modo demo con `NEXT_PUBLIC_DEMO_MODE`.

---

## Stack

- **Next.js 16** (App Router, Server Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Prisma 7** (ORM) + driver adapters (SQLite dev / PostgreSQL prod)
- **Auth.js / NextAuth v5** (credenciales, roles ADMIN/SELLER/SERVICE, sesión JWT)
- **Framer Motion** (animaciones), **Lucide React** (iconos), **React Hook Form** + **Zod** (formularios)

---

## Estructura

```
app/          Rutas públicas + panel admin
components/   ui (shadcn) · layout · home · vehicles · forms · services · admin
lib/          db, auth, demo, validations, whatsapp, email, storage, analytics
actions/      Server Actions por dominio
types/        Tipos y augmentación de sesión
prisma/       schema, migrations, seed
```

---

## Requisitos

- Node.js 20+ (probado con Node 26)
- npm

## Instalación

```bash
npm install
```

## Variables de entorno

```bash
cp .env.example .env
```

Editar `.env` (ver `.env.example` para la descripción de cada variable). Lo esencial:

- `DATABASE_URL` — SQLite por defecto; en producción usar PostgreSQL.
- `AUTH_SECRET` — generá una con `npx auth secret`.
- `NEXT_PUBLIC_SITE_URL` — URL del sitio.
- `NEXT_PUBLIC_DEMO_MODE=true` — activa insignia DEMO y evita comunicaciones reales.

## Base de datos y seed

```bash
# Generar cliente
npm run db:generate

# Aplicar migraciones (SQLite dev)
npm run db:migrate

# Cargar datos demo (placeholders, sin datos reales como oficiosos)
npm run db:seed

# Abrir Studio (navegar la DB)
npm run db:studio
```

Usuarios demo creados por el seed (contraseña: `admin123`):

| Email                | Rol     |
|----------------------|---------|
| `admin@demo.local`   | ADMIN   |
| `vendedor@demo.local`| SELLER  |
| `service@demo.local` | SERVICE |

## Desarrollo

```bash
npm run dev
```

Abrir http://localhost:3000 — Panel: http://localhost:3000/admin

## Desarrollo local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Marianorio/ToyotaHomu.git
cd ToyotaHomu
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editá `.env` con tus valores (ver `.env.example` para referencia). Lo esencial:
- `DATABASE_URL` — SQLite por defecto (`file:./dev.db`).
- `AUTH_SECRET` — generá una con `npx auth secret`.
- `NEXT_PUBLIC_SITE_URL` — URL del sitio (local: `http://localhost:3000`).
- `NEXT_PUBLIC_DEMO_MODE=true` — activa insignia DEMO.

### 4. Base de datos y seed

```bash
# Generar el cliente de Prisma
npm run db:generate

# Aplicar migraciones
npm run db:migrate

# Cargar datos demo (vehículos, usados, leads, etc.)
npm run db:seed
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abrí **http://localhost:3000** para ver el sitio.
Panel admin: **http://localhost:3000/admin** (usuario: `admin@demo.local`, contraseña: `admin123`).

## Lint y build

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

---

## Modo DEMO / Portfolio

Cuando `NEXT_PUBLIC_DEMO_MODE=true`:

- Se muestra una insignia discreta "DEMO / Portfolio" en la UI.
- Los datos se presentan como ilustrativos (no oficiales).
- No se envían emails/WhatsApp reales.
- No se usa información comercial falsa como si fuera oficial.

La lógica de producción queda intacta; activar/desactivar la variable es suficiente.

## Deploy (producción)

- **Hosting:** Vercel (o similar).
- **Base de datos:** cambiar `DATABASE_URL` a un PostgreSQL (Supabase, Neon, Vercel Postgres) y correr `npx prisma migrate deploy`.
- El código no queda acoplado a SQLite: el cliente Prisma elige el driver adapter según la URL.

```bash
# en CI/CD o local antes del deploy:
npx prisma migrate deploy
npx prisma generate
npm run build
```

## Administración

El panel admin (`/admin`) permite gestionar vehículos, promociones, financiación, leads (mini-CRM), test drives, usados, servicios, contenido de la Home (hero, banners, destacados) y la configuración global (contacto, redes, colores). El acceso y los permisos se controlan por rol.

## Design System

Estética automotriz premium: espacio negativo, jerarquía editorial, rojo como acento. Referencia visual interna en `/design-system`.

### Paleta (CSS custom properties, modificables)

| Token | Uso | Valor base |
|-------|-----|------------|
| `--primary` | Acento rojo (CTA, active, links) | `#e4002b` (oklch) |
| `--background` | Fondo principal | Blanco `oklch(1 0 0)` |
| `--foreground` | Texto principal | Negro `oklch(0.145 0 0)` |
| `--muted` | Fondo sutil / secondary surfaces | Gris claro `oklch(0.97 0 0)` |
| `--muted-foreground` | Texto secundario | Gris medio `oklch(0.556 0 0)` |
| `--border` | Bordes y divisores | Gris claro `oklch(0.922 0 0)` |
| `--secondary` | Botones secundarios / badges | Gris muy claro |
| `--destructive` | Errores / alertas / danger | Rojo oscuro |

Los colores se pueden cambiar desde las variables CSS o `globals.css`. La paleta se extiende con `emerald` de Tailwind para estados de éxito (badge "Disponible", WhatsApp).

### Tipografía

Utilidades Tailwind v4 definidas en `@theme` de `globals.css`:

| Utilidad | Uso | Tamaño (desktop) |
|----------|-----|------------------|
| `text-display` | Hero / secciones principales | `clamp(2.25rem, 5vw, 4.5rem)` |
| `text-h1` | Títulos de página | `clamp(1.875rem, 3.5vw, 3.5rem)` |
| `text-h2` | Subtítulos de sección | `clamp(1.5rem, 2.5vw, 2.625rem)` |
| `text-h3` | Títulos de card / componente | `clamp(1.25rem, 1.8vw, 1.75rem)` |
| `text-body-lead` | Cuerpo de lectura principal | `clamp(1.0625rem, 1.4vw, 1.375rem)` |
| `text-small` | Texto pequeño | `0.8125rem` |
| `text-caption` | Leyendas, notas al pie | `0.8125rem` + `letter-spacing: 0.02em` |
| `text-eyebrow` | Labels uppercase automotriz | `0.75rem` + `letter-spacing: 0.14em` |

Fuente: Geist Sans (cargada via `next/font/google`, variable `--font-geist-sans`). Monospace: Geist Mono.

### Contenedor

`Container` / utility `container-site`: ancho máximo `72rem` (1152px), paddings responsive `1.25rem → 1.5rem → 2rem` según breakpoint.

### Spacing

Basado en tokens nativos de Tailwind (`p-*`, `gap-*`, `space-y-*`, `mt-*`, etc.). No se definen valores custom; se usa la escala estándar.

### Componentes principales

| Componente | Ubicación | Notas |
|------------|-----------|-------|
| `Button` | `components/ui/button.tsx` | Variantes: default/secondary/outline/ghost/destructive/link. Usa `buttonVariants`. **No usar `asChild`** (base-ui usa `render`). |
| `Badge` | `components/ui/badge.tsx` | Variantes: default/secondary/destructive/outline/ghost/link. |
| `BadgeNuevo/Hibrido/etc` | `components/ui/vehicle-badges.tsx` | Badges semánticos de negocio con iconos Lucide. |
| `VehicleCard` | `components/vehicles/vehicle-card.tsx` | Variantes: default/featured/compact. Imagen + badges + datos + CTAs. |
| `VehicleImage` | `components/vehicles/vehicle-image.tsx` | next/image si hay src; silueta SVG premium si no (demo). |
| `WhatsAppButton` | `components/layout/whatsapp-button.tsx` | Variantes: floating (fixed bottom-right), button, round. |
| `Navbar` | `components/layout/navbar.tsx` | Sticky, transición al scroll, menú mobile drawer. |
| `Footer` | `components/layout/footer.tsx` | Presentacional, 3 columnas de links + info contacto. |
| `MobileBottomActions` | `components/layout/mobile-bottom-actions.tsx` | Fixed bottom: Vehículos · Cotizar · WhatsApp. Visible solo en mobile. |
| `Container` | `components/ui/container.tsx` | Wrapper global reutilizable. |
| `LoadingButton` | `components/ui/loading.tsx` | Botón con spinner + "Procesando…". |
| `Spinner` | `components/ui/loading.tsx` | Spinner SVG accesible (aria-hidden). |
| `PageLoading` | `components/ui/loading.tsx` | Skeleton centrado para carga de páginas. |
| `EmptyState` | `components/ui/feedback.tsx` | "No encontramos vehículos…" + CTA. |
| `ErrorState` | `components/ui/feedback.tsx` | Error + reintentar/volver. |
| `SuccessState` | `components/ui/feedback.tsx` | Confirmación de envío. |
| `Fade/SlideUp/Scale` | `components/ui/motion.tsx` | Primitivas Framer Motion con `prefers-reduced-motion`. |
| `StaggerGroup/Item` | `components/ui/motion.tsx` | Animación en cascada para grids de cards. |
| `DemoBadge` | `components/layout/DemoBadge.tsx` | Insignia "DEMO / Portfolio" discreta (solo con `NEXT_PUBLIC_DEMO_MODE`). |
| `Toaster` | `components/ui/sonner.tsx` | Notificaciones toast (sonner + next-themes). |

### Convenciones

- **Server Components por defecto**, Client Components solo para interactividad (`useState`, `useEffect`, `framer-motion`, `useReducedMotion`).
- **`buttonVariants` + `<Link>`** en vez de `<Button asChild>` (base-ui incompatibilidad con `asChild`).
- **Tokens CSS** en lugar de valores hardcodeados; la paleta se cambia desde `globals.css`.
- **Accesibilidad**: focus-visible en todos los links/botones, aria-label en botones de icono, contraste suficiente, semantic HTML.
- **CTAs**: todo componente con acción tiene una jerarquía visual clara (primary > secondary > ghost).
- **Responsive**: mobile-first; breakpoints Tailwind default (`sm`, `md`, `lg`, `xl`).
- **No exceder ~300-400 líneas por archivo**; refactorizar si crece.

## Fases de planificación

El proyecto está dividido en fases incrementales. Cada fase entrega valor funcional completo antes de pasar a la siguiente.

| Fase | Estado | Descripción |
|------|--------|-------------|
| **Fase 1 — Fundación** | ✅ Completada | Setup del proyecto, design system, layout base (navbar, footer), esquema de base de datos Prisma, autenticación con Auth.js, variables de entorno. |
| **Fase 2 — Catálogo de vehículos** | ✅ Completada | CRUD de vehículos (0km), categorías, cards con badges, páginas de detalle, filtros por categoría/combustible/transmisión, ordenamiento, galería de imágenes. |
| **Fase 3 — Páginas públicas** | ✅ Completada | Home completa (hero, quick actions, featured vehicles, financing preview, promotions, comparison CTA, after-sales, trade-in, test drive, concessionaire, location, final CTA), página de contacto, página de cotización, design system público. |
| **Fase 4 — Vehículos usados** | ✅ Completada | Sección de usados con hero, beneficios de confianza, filtros por marca/año, cards con datos de kilometraje y estado, páginas de detalle con galería, especificaciones y CTAs. |
| **Fase 5 — Panel admin (mini-CRM)** | ✅ Completada | Dashboard con métricas, gestión de vehículos (0km y usados), gestión de promociones, gestión de financiación, leads (mini-CRM con asignación a asesores), test drives, configuración del sitio (contacto, redes, colores, contenido del home). Panel protegido por roles (ADMIN/SELLER/SERVICE): el proxy solo hace el chequeo UX de cookie de sesión y la verificación fuerte de sesión/rol ocurre vía `auth()` en Node runtime. |
| **Fase 6 — Funcionalidades avanzadas** | 🚧 En desarrollo | Comparador de vehículos lado a lado (hasta 3, vía barra flotante y `/comparador`) ✅, simulador de cuotas interactivo (`/financiacion`, sistema francés) ✅, sitemap/robots + datos estructurados JSON-LD (AutoDealer/Product) + canonical ✅, páginas institucionales (`/test-drive`, `/promociones`, `/postventa`, `/servicios`, `/nosotros`, `/ubicacion`, `/privacidad`, `/terminos`) ✅, centro de ayuda (`/preguntas-frecuentes`) ✅, reportes de sustentabilidad con libro interactivo (`/sustentabilidad`, `react-pageflip`) ✅. Pendiente: notificaciones por email, integración con WhatsApp Business API, analytics de visitas. |
| **Fase 7 — Producción** | 🚧 Pendiente | Optimización de rendimiento (imágenes, caching, ISR), accesibilidad WCAG, migración a PostgreSQL, deploy a Vercel, monitoreo y logs. |
| **Fase 8 — PWA / Mobile** | 🚧 Pendiente | Progressive Web App con service workers, instalación en mobile, offline mode para catálogo, notificaciones push. |
| **Fase 9 — Multi-concesionaria** | 🚧 Pendiente | Soporte para múltiples sucursales, gestión por ubicación, inventario distribuido, geolocalización de vehículos cercanos. |
| **Fase 10 — Pagos y financiación** | 🚧 Pendiente | Integración con pasarelas de pago (MercadoPago, Stripe), simulador de cuotas avanzado, aprobación online, contratos digitales. |
| **Fase 11 — IA y automatización** | 🚧 Pendiente | Chatbot con IA para consultas, recomendaciones personalizadas de vehículos, scoring de leads, respuestas automáticas por WhatsApp. |
| **Fase 12 — Marketing y CRM avanzado** | 🚧 Pendiente | Email marketing automatizado, campañas segmentadas, funnel de conversión, integración con HubSpot/Salesforce, remarketing. |
| **Fase 13 — Analytics y reporting** | 🚧 Pendiente | Dashboard de métricas en tiempo real, reportes de ventas, análisis de tráfico, heatmaps, exportación de datos (CSV, PDF). |
| **Fase 14 — API pública e integraciones** | 🚧 Pendiente | REST/GraphQL API pública, webhooks, integración con portales (MercadoLibre, Zonaprop), sincronización con sistemas de gestión. |
| **Fase 15 — Internacionalización** | 🚧 Pendiente | Soporte multi-idioma (es/en/pt), monedas múltiples, adaptación regional de contenido, SEO internacional (hreflang). |

**Estado actual:** El proyecto está en la **Fase 5 completada** y la **Fase 6 en desarrollo** (comparador, simulador, SEO, páginas institucionales, FAQ y libro de sustentabilidad listos). Pendiente solo email/WhatsApp/analytics de Fase 6; luego Fase 7.

## Arquitectura y decisiones

- **Monolito Next.js** full-stack (Server Components + Server Actions) sin backend separado.
- **Modelado relacional** de vehículos (categorías, versiones, colores, características, specs) para filtros y comparaciones en DB, no JSON sueltos.
- **Leads** como entidad central (cotización, test drive, usados, contacto, service, whatsapp) con asignación a asesores.
- **Contenido CMS** en DB (HomePage + SiteSettings), nada hardcodeado.
- **Seguridad del panel en dos capas**: el `proxy.ts` (reemplazo de middleware en Next 16) solo redirige si no hay cookie de sesión (capa UX); la autenticación real y el control de roles corren en Node runtime (`auth()` + `requireRole`/`requireAdminPage` en layout y páginas), porque la sesión de NextAuth v5 es un JWT cifrado JWE que el edge proxy no puede verificar.
- **Neutralidad de DB** vía driver adapters de Prisma para migrar de SQLite a PostgreSQL sin reescritura.
