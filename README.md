# EduPortal Frontend — base reformulada hasta la sesión 5

Base del proyecto integrador rehecha para el curso hasta la sesión 5. Esta versión **todavía usa CSS tradicional**, pero ya adopta la identidad visual moderna que se migrará a **Tailwind CSS 4.1** en la siguiente etapa.

## Objetivo didáctico

Esta base existe para que los estudiantes puedan comparar dos enfoques:

1. **Construcción visual con CSS clásico**, usando variables, sombras, layouts, estados y componentes.
2. **Migración posterior a Tailwind CSS 4.1**, donde buena parte de esta intención visual podrá expresarse de forma más rápida y consistente con utilidades.

## Qué incluye

- React + Vite
- Diseño moderno, suave y cercano a neumorfismo/soft UI
- Módulo de registro de usuario
- Formularios controlados
- Validación por campo y validación final
- Renderizado condicional del estado exitoso
- Base visual pensada para futura traducción a Tailwind
- Documentación adicional en `docs/`

## Estructura

```text
eduportal-frontend-s5-css-base/
├─ docs/
│  ├─ design-identity.md
│  └─ tailwind-translation-guide.md
├─ src/
│  ├─ components/
│  │  ├─ FeatureCard.jsx
│  │  ├─ FormField.jsx
│  │  ├─ Header.jsx
│  │  ├─ RegisterForm.jsx
│  │  └─ SuccessMessage.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y ejecución

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Qué debe observar el estudiante

- Cuántas decisiones visuales quedaron expresadas en CSS manual.
- Cuántos estados de interfaz ya están definidos: normal, foco, error, éxito.
- Cómo una sola pantalla ya requiere muchas reglas de layout, espaciado, color y profundidad.
- Por qué una utilidad-first framework como Tailwind acelera tanto cuando la identidad visual ya está bien pensada.

## Preparación para Tailwind CSS 4.1

En Tailwind CSS con Vite, la instalación oficial actual usa `tailwindcss` y `@tailwindcss/vite`, y la carga del framework se hace importando `@import "tailwindcss";` en el CSS principal. Consulta la documentación oficial cuando se haga la migración real.

## Próximo paso sugerido

Migrar esta base a:

- Tailwind CSS 4.1
- tokens visuales equivalentes en utilidades
- componentes con `className` utilitario
- posible extracción de patrones repetidos a componentes de UI

