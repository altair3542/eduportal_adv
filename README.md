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
│   └── AppContext.jsx      → estado global: perfil, sesión, favoritos
│
├── data/
│   └── universities.seed.json
│
├── features/               → módulos de negocio
│   ├── favorites/          → página de favoritos (ruta protegida)
│   ├── onboarding/         → perfil institucional y validación semántica
│   └── universities/       → explorador con búsqueda y filtrado
│
├── hooks/
│   └── UseLocalStorage.js  → sincronización reactiva con localStorage
│
├── lib/
│   └── cn.js               → utilidad para combinar clases CSS
│
├── pages/
│   ├── DashboardPage.jsx
│   └── NotFoundPage.jsx
│
└── services/
    └── universties.service.js  → acceso a datos y normalización
```

## Rutas de la aplicación

| Ruta | Componente | Acceso |
|------|-----------|--------|
| `/` | `DashboardPage` | Libre |
| `/perfil` | `OnboardingPage` | Libre |
| `/universidades` | `UniversityExplorerPage` | Libre |
| `/favoritos` | `FavoritesPage` | Requiere sesión activa |

Si se intenta acceder a `/favoritos` sin sesión, la app redirige automáticamente a `/perfil`.

## Estado global

El contexto expone los siguientes valores y funciones:

```js
// Estado
profile        // perfil del usuario o null
session        // { isAuthenticated: boolean }
favorites      // array de universidades guardadas

// Funciones
saveProfile(data)          // guarda el perfil y activa la sesión
clearProfile()             // borra el perfil y cierra la sesión
logout()                   // cierra la sesión sin borrar el perfil
toggleFavorite(university) // agrega o quita de favoritos
isFavorite(universityId)   // devuelve true/false
```

El estado persiste en `localStorage` con las claves `eduportal:profile`, `eduportal:session` y `eduportal:favorites`. Al recargar la página, el estado se restaura automáticamente.

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
