# EduPortal Advanced

SPA académica construida con React, React Router y Tailwind CSS. Permite explorar universidades, crear un perfil institucional con validación semántica y guardar favoritos con acceso protegido.

El proyecto se construye en sesiones acumulativas: cada una añade una capa de complejidad sobre la anterior, reflejando cómo crece una aplicación real.

## Sesiones del proyecto

| Sesión | Tema | Conceptos |
|--------|------|-----------|
| 1 | Componentes y formularios | Estado local, formularios controlados, validación por campo |
| 2 | Capa de datos | Servicios asíncronos, normalización, hooks personalizados, estados de carga |
| 3 | Arquitectura SPA | React Router, layout persistente, contexto global, rutas protegidas |
| 4 | Formularios avanzados | Validación semántica, campos con dependencias, persistencia en localStorage |
| 5 | Exploración madura | Custom hooks, filtros en URL con `useSearchParams`, página de detalle dinámica, shortlist con metadatos |

## Inicio rápido

Requisito: Node.js LTS (recomendado 20.x o superior).

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

Abre la URL que aparece en consola (normalmente `http://localhost:5173`).

## Scripts disponibles

```bash
npm run dev      # servidor de desarrollo con hot reload
npm run build    # build de producción en /dist
npm run preview  # vista previa del build de producción
```

## Estructura del proyecto

```
src/
├── app/                    → infraestructura de la SPA
│   ├── AppRoutes.jsx       → mapa de rutas
│   ├── AppShell.jsx        → layout persistente (header + nav)
│   └── ProtectedRoute.jsx  → guarda de acceso autenticado
│
├── components/             → componentes reutilizables sin lógica de negocio
│   ├── ButtonPrimary.jsx
│   ├── FormField.jsx
│   ├── NavItem.jsx
│   ├── SectionHeading.jsx
│   └── SurfaceCard.jsx
│
├── context/
│   └── AppContext.jsx      → estado global: perfil, sesión, favoritos con metadatos
│
├── data/
│   └── universities.seed.json
│
├── features/               → módulos de negocio
│   ├── favorites/          → shortlist con prioridad y notas (ruta protegida)
│   ├── onboarding/         → perfil institucional y validación semántica
│   └── universities/
│       ├── UniversityCard.jsx           → tarjeta con enlace a detalle y nota rápida
│       ├── UniversityDetailPage.jsx     → detalle individual con gestión de shortlist
│       ├── UniversityExplorerPage.jsx   → página de exploración (orquesta toolbar + grid)
│       ├── UniversityExplorerToolbar.jsx → barra de filtros extraída como componente
│       ├── UniversityStates.jsx         → estados de carga, error y vacío
│       └── useUniversityExplorer.js     → hook: filtros, orden y búsqueda sincronizados con URL
│
├── hooks/
│   └── useLocalStorage.js  → sincronización reactiva con localStorage
│
├── lib/
│   └── cn.js               → utilidad para combinar clases CSS
│
├── pages/
│   ├── DashboardPage.jsx
│   └── NotFoundPage.jsx
│
└── services/
    └── universties.service.js  → acceso a datos, normalización y búsqueda por ID
```

## Rutas de la aplicación

| Ruta | Componente | Acceso |
|------|-----------|--------|
| `/` | `DashboardPage` | Libre |
| `/perfil` | `OnboardingPage` | Libre |
| `/universidades` | `UniversityExplorerPage` | Libre |
| `/universidades/:universityId` | `UniversityDetailPage` | Libre |
| `/favoritos` | `FavoritesPage` | Requiere sesión activa |

Si se intenta acceder a `/favoritos` sin sesión, la app redirige automáticamente a `/perfil`.

La ruta de detalle usa el parámetro dinámico `:universityId` generado por el servicio (slug derivado de nombre y país). Los filtros del explorador se persisten como query params en la URL (`?q=`, `?country=`, `?domainZone=`, `?sort=`, `?saved=`), lo que permite compartir o recargar la búsqueda sin perder el estado.

## Estado global

El contexto expone los siguientes valores y funciones:

```js
// Estado
profile        // perfil del usuario o null
session        // { isAuthenticated: boolean }
favorites      // array de entradas { id, university, note, priority }

// Funciones
saveProfile(data)                        // guarda el perfil y activa la sesión
clearProfile()                           // borra el perfil y cierra la sesión
logout()                                 // cierra la sesión sin borrar el perfil
toggleFavorite(university)               // agrega o quita de favoritos
isFavorite(universityId)                 // devuelve true/false
getFavoriteById(universityId)            // devuelve la entrada completa o null
updateFavoriteMeta(universityId, patch)  // actualiza priority y/o note de un favorito
```

Cada entrada de favorito tiene la forma:

```js
{
  id: 'colombia-universidad-nacional',  // mismo ID que la universidad
  university: { id, name, country, domain, domainZone, website },
  note: '',       // texto libre del usuario
  priority: 'medium' // 'high' | 'medium' | 'low'
}
```

El estado persiste en `localStorage` con las claves `eduportal:profile`, `eduportal:session` y `eduportal:favorites`. Al recargar la página, el estado se restaura automáticamente.

## Sesión 5 — Exploración madura (2026-04-21)

Esta sesión introduce tres patrones centrales de una SPA de producto: estado en URL, composición de lógica en custom hooks y páginas de detalle con rutas dinámicas.

### Nuevos archivos

| Archivo | Responsabilidad |
|---------|----------------|
| `useUniversityExplorer.js` | Encapsula toda la lógica del explorador: carga de datos, filtrado, ordenamiento y sincronización de filtros con `useSearchParams`. Los filtros viven en la URL, no en `useState`. |
| `UniversityExplorerToolbar.jsx` | Componente de presentación pura para la barra de filtros, extraído de `UniversityExplorerPage`. Recibe props y dispara callbacks; no tiene estado propio. |
| `UniversityDetailPage.jsx` | Página de detalle individual accesible en `/universidades/:universityId`. Carga la institución con `getUniversityById`, muestra sus datos y permite gestionar prioridad y nota directamente desde esta vista. |

### Cambios relevantes en archivos existentes

**`AppContext.jsx`**
- Modelo de favoritos enriquecido: cada entrada ahora incluye `note` y `priority` además del objeto `university`.
- Nueva función `updateFavoriteMeta(universityId, patch)`: permite actualizar campos individuales sin reemplazar la entrada completa.
- Nueva función `getFavoriteById(universityId)`: acceso directo a la entrada de favorito por ID.
- Se reemplazan literales inline por constantes nombradas (`INITIAL_FAVORITES`, `INITIAL_SESSION`).

**`universties.service.js`**
- Nueva función exportada `getUniversityById(universityId)`: reutiliza `getUniversities()` y filtra por ID.

**`UniversityExplorerPage.jsx`**
- Refactorizada para delegar toda la lógica al hook `useUniversityExplorer`.
- La página queda como orquestador: recibe los valores del hook y los pasa al `Toolbar` y al grid.

**`UniversityCard.jsx`**
- Añade enlace "Ver detalle" hacia `/universidades/:id`.
- Muestra la nota rápida del favorito si existe.

**`FavoritesPage.jsx`**
- Cada tarjeta de favorito ahora incluye selector de prioridad y área de texto para notas.
- Enlace "Ver detalle" directo desde la shortlist.

**`AppRoutes.jsx`**
- Nueva ruta `/universidades/:universityId` apuntando a `UniversityDetailPage`.
- Corrección de typo en import: `DashboardPAge` → `DashboardPage`.

### Patrón de filtros en URL

```js
// Los filtros se leen desde useSearchParams, no desde useState
const query      = searchParams.get('q') ?? ''
const country    = searchParams.get('country') ?? 'all'
const domainZone = searchParams.get('domainZone') ?? 'all'
const sort       = searchParams.get('sort') ?? 'name-asc'
const saved      = searchParams.get('saved') ?? '0'
```

La URL resultante queda como `/universidades?q=nacional&country=Colombia&sort=name-asc`, lo que hace la búsqueda compartible, navegable con el botón atrás del navegador y resistente a recargas.

## Documentación técnica

La carpeta `docs/` contiene documentación adicional:

| Archivo | Contenido |
|---------|-----------|
| `docs/architecture.md` | Documentación pedagógica completa: cómo funciona cada pieza, por qué existe y cómo se conecta con las demás |
| `docs/design-identity.md` | Decisiones de identidad visual del proyecto |
| `docs/tailwind-translation-guide.md` | Guía conceptual de la migración de CSS a Tailwind |

## Solución de problemas

### Error de política de scripts (Windows PowerShell)

Si ves `running scripts is disabled on this system`:

**Opción A** — solo para la terminal actual:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev
```

**Opción B** — usando CMD en lugar de PowerShell:
```cmd
npm.cmd run dev
```

**Opción C** — configuración global (requiere PowerShell como Administrador):
```powershell
Set-ExecutionPolicy -Scope LocalMachine -ExecutionPolicy RemoteSigned
```

### Puerto ocupado

Vite sugerirá automáticamente un puerto alternativo. Acéptalo o cierra el proceso que ocupa el puerto original.

### Dependencias corruptas

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

En Windows PowerShell:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```
