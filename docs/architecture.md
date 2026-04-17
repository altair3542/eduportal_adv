# Arquitectura de EduPortal Advanced

Documentación pedagógica del proyecto. Explica qué hace cada pieza, por qué existe y cómo se conecta con las demás.

---

## Tabla de contenidos

1. [Visión general](#1-visión-general)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Árbol de archivos](#3-árbol-de-archivos)
4. [Punto de entrada](#4-punto-de-entrada)
5. [Enrutamiento y layout](#5-enrutamiento-y-layout)
6. [Estado global y persistencia](#6-estado-global-y-persistencia)
7. [Capa de datos](#7-capa-de-datos)
8. [Sistema de formularios y validación](#8-sistema-de-formularios-y-validación)
9. [Features](#9-features)
10. [Componentes reutilizables](#10-componentes-reutilizables)
11. [Flujo de datos completo](#11-flujo-de-datos-completo)
12. [Patrones y decisiones de diseño](#12-patrones-y-decisiones-de-diseño)

---

## 1. Visión general

EduPortal Advanced es una SPA (Single Page Application) académica para explorar universidades, crear un perfil institucional y guardar favoritos. El proyecto se construye en sesiones acumulativas; cada sesión añade una capa de complejidad sobre la anterior.

| Sesión | Tema principal | Concepto clave |
|--------|---------------|----------------|
| 1 | Componentes y formularios base | Estado local, formularios controlados |
| 2 | Capa de datos | Servicios asíncronos, normalización, hooks personalizados |
| 3 | Arquitectura SPA | React Router, layout persistente, estado global |
| 4 | Formularios avanzados | Validación semántica, dependencias entre campos |

---

## 2. Stack tecnológico

```
React 18          → biblioteca de UI (componentes + hooks)
React Router 7    → enrutamiento del lado del cliente
Tailwind CSS 4    → estilos utilitarios (con plugin oficial para Vite)
Vite 5            → bundler y servidor de desarrollo
```

No hay TypeScript, no hay librería de formularios externa (react-hook-form, formik), ni librería de estado (Redux, Zustand). Todo se construye con las primitivas de React para que los conceptos sean explícitos.

---

## 3. Árbol de archivos

```
src/
├── app/                        → infraestructura de la SPA
│   ├── AppRoutes.jsx           → define todas las rutas
│   ├── AppShell.jsx            → layout persistente (header + nav)
│   └── ProtectedRoute.jsx      → guarda de acceso autenticado
│
├── components/                 → componentes reutilizables sin lógica de negocio
│   ├── ButtonPrimary.jsx
│   ├── FeatureCard.jsx
│   ├── FormField.jsx
│   ├── Header.jsx
│   ├── NavItem.jsx
│   ├── RegisterForm.jsx
│   ├── SectionHeading.jsx
│   ├── SuccessMessage.jsx
│   └── SurfaceCard.jsx
│
├── context/
│   └── AppContext.jsx           → estado global: perfil, sesión, favoritos
│
├── data/
│   └── universities.seed.json  → datos estáticos de universidades
│
├── features/                   → módulos de negocio (cada feature es autónoma)
│   ├── favorites/
│   │   └── FavoritesPage.jsx
│   ├── onboarding/
│   │   ├── AdvancedProfileForm.jsx
│   │   ├── OnboardingPage.jsx
│   │   ├── ProfileRegisterForm.jsx
│   │   ├── ProfilewSummaryCard.jsx
│   │   ├── SuccessState.jsx
│   │   └── validation.js
│   └── universities/
│       ├── UniversityCard.jsx
│       ├── UniversityExplorerPage.jsx
│       ├── UniversityFilters.jsx
│       ├── UniversityStates.jsx
│       └── useUniversities.js
│
├── hooks/
│   └── UseLocalStorage.js      → hook genérico para sincronizar estado con localStorage
│
├── lib/
│   └── cn.js                   → utilidad para combinar clases CSS condicionalmente
│
├── pages/
│   ├── DashboardPage.jsx       → pantalla de inicio (resumen del estado global)
│   └── NotFoundPage.jsx        → página 404
│
├── services/
│   └── universties.service.js  → capa de acceso a datos (simula una API async)
│
├── App.jsx                     → raíz del árbol de componentes
├── index.css                   → importación de Tailwind + estilos base
└── main.jsx                    → punto de entrada; monta providers globales
```

---

## 4. Punto de entrada

### `src/main.jsx`

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>        // habilita el enrutamiento
      <AppProvider>        // provee el estado global
        <App />            // árbol de componentes
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
```

El orden importa: `BrowserRouter` debe envolver `AppProvider` porque los componentes de contexto pueden necesitar hooks de router en el futuro. `AppProvider` envuelve todo para que cualquier componente de la app pueda leer el estado global.

---

## 5. Enrutamiento y layout

### `src/app/AppRoutes.jsx`

Define el mapa completo de URLs de la aplicación:

```
/                  → DashboardPage    (panel general)
/perfil            → OnboardingPage   (formulario de perfil)
/universidades     → UniversityExplorerPage
/favoritos         → FavoritesPage    (protegida: requiere sesión)
/*                 → NotFoundPage
```

El truco clave es que todas las rutas son hijas de `<AppShell />`:

```jsx
<Route element={<AppShell />}>      // layout que persiste entre rutas
  <Route index element={<DashboardPage />} />
  <Route path="perfil" element={<OnboardingPage />} />
  ...
</Route>
```

Esto significa que el header y la navegación se renderizan **una sola vez** y no se destruyen al cambiar de ruta. Solo cambia el contenido del `<Outlet />`.

### `src/app/AppShell.jsx`

Layout persistente. Contiene el header con el nombre de la app, el perfil activo y la barra de navegación. Renderiza `<Outlet />` donde deben aparecer las páginas.

Consume el contexto para mostrar:
- Nombre del perfil activo (o "Sin perfil activo")
- Conteo de favoritos en la pestaña de navegación
- Botón de cerrar sesión cuando hay sesión activa

### `src/app/ProtectedRoute.jsx`

```jsx
function ProtectedRoute({ children }) {
  const { session } = useAppContext();
  const location = useLocation();

  if (!session.isAuthenticated) {
    return <Navigate to="/perfil" replace state={{ from: location.pathname }} />;
  }

  return children;
}
```

Si el usuario intenta acceder a `/favoritos` sin sesión, es redirigido a `/perfil`. Se guarda la ruta de origen en `state.from` para poder redirigir de vuelta después del login (patrón estándar en React Router).

---

## 6. Estado global y persistencia

### `src/hooks/UseLocalStorage.js`

Hook genérico que sincroniza un estado de React con `localStorage`. Es la base de toda la persistencia de la app.

```js
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // Inicialización lazy: lee localStorage solo una vez, al montar
    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    // Cada vez que cambia `value`, lo persiste en localStorage
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

**Por qué funciona así:**
- La función en `useState(() => ...)` es una "inicialización lazy": solo se ejecuta en el primer render, evitando leer `localStorage` en cada re-render.
- El `useEffect` escucha cambios en `value` y los sincroniza al almacenamiento. Es reactivo: no hay que llamar nada manualmente.

### `src/context/AppContext.jsx`

Centraliza el estado de toda la aplicación. Usa tres claves en `localStorage`:

| Clave | Tipo | Propósito |
|-------|------|-----------|
| `eduportal:profile` | `object \| null` | Perfil del usuario (nombre, correo, universidad objetivo, etc.) |
| `eduportal:favorites` | `array` | Lista de universidades guardadas |
| `eduportal:session` | `{ isAuthenticated: boolean }` | Estado de autenticación simulado |

**Funciones expuestas en el contexto:**

```js
saveProfile(nextProfile)   // guarda el perfil Y activa la sesión
clearProfile()             // limpia el perfil Y cierra la sesión
logout()                   // solo cierra la sesión (el perfil queda)
toggleFavorite(university) // agrega o quita una universidad de favoritos
isFavorite(universityId)   // devuelve true/false según el id
```

La diferencia entre `clearProfile` y `logout` es semántica e importante:
- `logout` simula un cierre de sesión sin perder el perfil guardado.
- `clearProfile` es un "reset completo": borra el perfil del localStorage y cierra la sesión.

**`useMemo` en el value:**

```js
const value = useMemo(
  () => ({ profile, saveProfile, clearProfile, session, logout, favorites, toggleFavorite, isFavorite }),
  [profile, session, favorites]
);
```

`useMemo` evita que todos los consumidores del contexto se re-rendericen cuando el componente padre `AppProvider` se re-renderiza por razones no relacionadas. Solo crea un nuevo objeto `value` cuando cambian `profile`, `session` o `favorites`.

**Patrón de uso en cualquier componente:**

```jsx
const { profile, saveProfile, clearProfile } = useAppContext();
```

`useAppContext` lanza un error descriptivo si se usa fuera de `AppProvider`, lo que facilita depurar configuraciones incorrectas.

---

## 7. Capa de datos

### `src/data/universities.seed.json`

Archivo JSON con datos estáticos de 6 universidades de 4 países. Estructura original de cada entrada:

```json
{
  "name": "Universidad de Antioquia",
  "country": "Colombia",
  "domains": ["udea.edu.co"],
  "web_pages": ["https://www.udea.edu.co"]
}
```

Los campos `domains` y `web_pages` son arrays porque el formato original de datos de universidades del mundo sigue este esquema. La app usa solo el primer elemento de cada array.

### `src/services/universties.service.js`

Capa de servicio que actúa como intermediario entre los datos crudos y los componentes. Expone una función asíncrona que normaliza los datos antes de entregarlos.

```js
// Convierte texto en slug seguro para usarlo como ID
function slugify(value) { ... }

// Transforma la estructura cruda del JSON en la estructura que necesita la app
function normalizeUniversity(university) {
  return {
    id: `${slugify(university.country)}-${slugify(university.name)}`,
    name: university.name ?? 'Institución sin nombre',
    country: university.country ?? 'País no especificado',
    domain: university.domains?.[0] ?? 'Dominio no disponible',
    website: university.web_pages?.[0] ?? '',
  }
}

export async function getUniversities() {
  await new Promise((resolve) => setTimeout(resolve, 700)) // simula latencia de red
  return universitiesSeed.map(normalizeUniversity)
}
```

**Por qué esta capa existe:**
- Desacopla el formato de los datos de su uso en la UI. Si el origen de datos cambia (un endpoint real), solo cambia el servicio.
- La normalización garantiza que todos los componentes reciban datos con la misma forma (`id`, `name`, `country`, `domain`, `website`), sin tener que manejar `domains[0]` o `web_pages[0]` en cada lugar.
- El delay simulado permite practicar estados de carga, error y vacío en la UI.

### `src/features/universities/useUniversities.js`

Hook personalizado que encapsula toda la lógica de estado para el explorador de universidades. Devuelve:

```js
{
  universities,           // lista completa sin filtrar
  filteredUniversities,   // lista después de aplicar query + country
  query, setQuery,        // texto de búsqueda por nombre
  country, setCountry,    // filtro por país ("all" = sin filtro)
  countries,              // lista de países únicos (derivada de universities)
  loading,                // true mientras se carga
  error,                  // mensaje de error si la carga falla
}
```

**Patrón `ignore` para efectos asíncronos:**

```js
useEffect(() => {
  let ignore = false;

  async function loadUniversities() {
    const data = await getUniversities();
    if (!ignore) setUniversities(data);   // solo actualiza si el componente sigue montado
  }

  loadUniversities();
  return () => { ignore = true; };        // cleanup: evita actualizar estado en componente desmontado
}, []);
```

Esto evita el error "Can't perform a React state update on an unmounted component" que ocurre si el usuario navega a otra página antes de que la carga termine.

**`useMemo` para derivados:**

```js
const countries = useMemo(() => {
  const unique = [...new Set(universities.map((item) => item.country))];
  return unique.sort((a, b) => a.localeCompare(b));
}, [universities]);

const filteredUniversities = useMemo(() => {
  return universities.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCountry = country === 'all' ? true : item.country === country;
    return matchesQuery && matchesCountry;
  });
}, [universities, query, country]);
```

Los valores derivados se recalculan solo cuando cambian sus dependencias, no en cada render.

---

## 8. Sistema de formularios y validación

### `src/features/onboarding/validation.js`

Módulo puro de validación. No tiene estado ni efectos secundarios: recibe datos y devuelve strings de error (vacío = sin error).

```js
// Extrae el dominio de un correo: "user@udea.edu.co" → "udea.edu.co"
export function getEmailDomain(email) { ... }

// Valida campos individuales por nombre
export function validateBasicField(name, value) {
  switch (name) {
    case 'nombre':       // requerido, mínimo 3 caracteres
    case 'correo':       // requerido, formato válido
    case 'programa':     // requerido
    case 'paisObjetivo': // requerido
    case 'universidadObjetivoId': // requerido
  }
}

// Valida la relación semántica entre tipoCorreo, correo y universidad seleccionada
export function validateInstitutionalDomain(formData, selectedUniversity) {
  // Solo aplica si tipoCorreo === 'institucional'
  // Verifica que el dominio del correo coincida con selectedUniversity.domain
}
```

La validación semántica es el concepto nuevo de la sesión 4: una regla de validación que no depende del valor de un campo aislado, sino de la **relación entre campos**. En este caso: si el usuario dice que tiene correo institucional, el dominio del correo debe coincidir con el dominio de la universidad seleccionada.

### `src/features/onboarding/AdvancedProfileForm.jsx`

Formulario controlado con 6 campos y dos tipos de validación:

1. **Validación por campo (inline):** se activa en cada `onChange` con `validateBasicField`.
2. **Validación semántica (al submit):** se activa en `handleSubmit` con `validateInstitutionalDomain`.

**Campos con dependencia cascada:**

```js
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prev) => {
    const next = { ...prev, [name]: value };
    if (name === 'paisObjetivo') {
      next.universidadObjetivoId = '';  // reset al cambiar país
    }
    return next;
  });
};
```

Cuando el usuario cambia el país, la universidad seleccionada se resetea automáticamente porque las universidades disponibles cambian.

**Filtrado reactivo de universidades:**

```js
const availableUniversities = useMemo(() => {
  if (!formData.paisObjetivo) return [];
  return universities.filter((item) => item.country === formData.paisObjetivo);
}, [universities, formData.paisObjetivo]);
```

El `<select>` de universidades se deshabilita mientras no haya país seleccionado:

```jsx
<select disabled={!formData.paisObjetivo} ...>
```

**Hint de dominio institucional:**

```jsx
{formData.tipoCorreo === 'institucional' && selectedUniversity ? (
  <div>El correo institucional debe terminar en: {selectedUniversity.domain}</div>
) : null}
```

Este bloque solo aparece cuando tiene sentido mostrarse: cuando el usuario eligió "Institucional" y ya seleccionó una universidad.

---

## 9. Features

### Onboarding (`src/features/onboarding/`)

Flujo condicional en `OnboardingPage`:

```jsx
{profile ? (
  <ProfileSummaryCard profile={profile} onReset={clearProfile} />
) : (
  <AdvancedProfileForm onSave={saveProfile} />
)}
```

- Si no hay perfil → muestra el formulario.
- Si hay perfil → muestra la tarjeta resumen con opción de editar (que llama a `clearProfile` para volver al formulario).

Componentes del módulo:

| Archivo | Propósito |
|---------|-----------|
| `OnboardingPage.jsx` | Orquesta el flujo perfil/formulario |
| `AdvancedProfileForm.jsx` | Formulario avanzado con validación semántica |
| `ProfilewSummaryCard.jsx` | Muestra el perfil guardado |
| `ProfileRegisterForm.jsx` | Versión básica del formulario (sesión anterior) |
| `SuccessState.jsx` | Estado de éxito tras registro básico |
| `validation.js` | Funciones puras de validación |

### Explorador de universidades (`src/features/universities/`)

| Archivo | Propósito |
|---------|-----------|
| `UniversityExplorerPage.jsx` | Orquesta carga, filtros y grid de tarjetas |
| `UniversityCard.jsx` | Tarjeta individual con botón de favorito |
| `UniversityFilters.jsx` | Inputs de búsqueda y filtro por país |
| `UniversityStates.jsx` | Componentes para estados: cargando, error, vacío |
| `useUniversities.js` | Hook con toda la lógica de datos y filtrado |

La página muestra exactamente uno de estos estados en cada momento:
```
loading → <LoadingState />
!loading && error → <ErrorState />
!loading && !error && 0 resultados → <EmptyState />
!loading && !error && resultados → grid de <UniversityCard />
```

### Favoritos (`src/features/favorites/FavoritesPage.jsx`)

Página protegida. Si no hay sesión activa, `ProtectedRoute` redirige a `/perfil` antes de que la página se renderice.

Reutiliza `UniversityCard` del módulo de universidades: el mismo componente funciona en el explorador y en favoritos porque consume `toggleFavorite` e `isFavorite` del contexto global, no de props locales.

---

## 10. Componentes reutilizables

### `src/lib/cn.js`

```js
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
```

Utilidad para combinar clases de Tailwind condicionalmente. Filtra `undefined`, `null`, `false` y strings vacíos. Sustituye el uso de template literals complejos:

```jsx
// sin cn:
className={`base-class ${condition ? 'active' : ''} ${otherClass}`}

// con cn:
className={cn('base-class', condition && 'active', otherClass)}
```

### `src/components/SurfaceCard.jsx`

Contenedor de tarjeta con el estilo visual principal del proyecto (glassmorphism suave). Acepta `children` y `className` para extenderse.

```jsx
<SurfaceCard className="space-y-4">
  ...contenido...
</SurfaceCard>
```

### `src/components/FormField.jsx`

Input controlado con label, manejo de errores y estilos condicionales. Acepta:

```
label, name, value, onChange, placeholder, error, type
```

El borde cambia de color según si hay error (`border-rose-300`) o no (`border-white/70`).

### `src/components/ButtonPrimary.jsx`

Botón con estilo principal. Acepta todas las props nativas de `<button>` via spread (`...props`), lo que permite usarlo como `type="submit"`, `onClick`, `disabled`, etc.

### `src/components/SectionHeading.jsx`

Encabezado de sección con tres niveles opcionales: `eyebrow` (etiqueta de sesión), `title` y `description`. Los tres son opcionales y se renderizan condicionalmente.

### `src/components/NavItem.jsx`

Enlace de navegación que usa `NavLink` de React Router para aplicar estilos al ítem activo automáticamente:

```jsx
className={({ isActive }) =>
  cn('base-styles', isActive ? 'active-styles' : 'inactive-styles')
}
```

---

## 11. Flujo de datos completo

```
main.jsx
  └── BrowserRouter
        └── AppProvider  ←──────────────────────────────┐
              │ provee: profile, saveProfile,            │
              │         clearProfile, session,           │
              │         logout, favorites,               │
              │         toggleFavorite, isFavorite       │
              └── AppRoutes                              │
                    └── AppShell  ←─ consume context     │
                          ├── /           DashboardPage  ←─ consume context
                          ├── /perfil     OnboardingPage ←─ consume context
                          │                 ├── (sin perfil) AdvancedProfileForm
                          │                 │     └── onSave(data) → saveProfile() ─┘
                          │                 └── (con perfil)  ProfileSummaryCard
                          │                       └── onReset() → clearProfile() ──┘
                          ├── /universidades  UniversityExplorerPage
                          │                    └── UniversityCard
                          │                          └── toggleFavorite() ──────────┘
                          └── /favoritos  [ProtectedRoute]
                                           └── FavoritesPage
                                                 └── UniversityCard
                                                       └── toggleFavorite() ────────┘
```

**Persistencia:**
Cada vez que `saveProfile`, `clearProfile`, `toggleFavorite` o `logout` modifica el estado en el contexto, `useLocalStorage` propaga el cambio a `localStorage` automáticamente vía `useEffect`. Al recargar la página, el estado se inicializa desde `localStorage`, por lo que el perfil y los favoritos sobreviven refrescos del navegador.

---

## 12. Patrones y decisiones de diseño

### Feature-based folder structure

Los archivos se organizan por funcionalidad (`features/onboarding/`, `features/universities/`) en lugar de por tipo (`components/`, `containers/`). Esto facilita entender y modificar una feature completa sin saltar entre carpetas.

### Componentes de presentación vs. contenedores

- **Componentes de presentación** (`SurfaceCard`, `FormField`, `ButtonPrimary`): solo reciben props y renderizan UI. Sin estado, sin efectos, sin consumo de contexto.
- **Páginas y contenedores** (`OnboardingPage`, `UniversityExplorerPage`): consumen el contexto y los hooks, orquestan la lógica y pasan datos hacia abajo.

### Validación en módulo separado

Las funciones de `validation.js` son funciones puras (sin dependencias de React). Esto permite:
- Probarlas sin montar componentes.
- Reutilizarlas en cualquier formulario que necesite las mismas reglas.
- Separan el *qué validar* del *cuándo validar* (que es responsabilidad del formulario).

### Normalización en el servicio

El JSON de universidades tiene una estructura con arrays (`domains`, `web_pages`). La normalización en `universties.service.js` traduce eso a objetos simples antes de que lleguen a la UI. Los componentes nunca ven `domains[0]`; solo ven `domain`.

### `useMemo` para derivados costosos

`filteredUniversities` y `countries` se derivan de `universities`. Si se recalcularan en cada render, el filtrado se ejecutaría aunque nada relevante hubiera cambiado. `useMemo` garantiza que solo se recalculan cuando cambian sus entradas.
