# Guía de traducción visual hacia Tailwind CSS 4.1

Este documento no migra todavía el proyecto. Sirve como puente conceptual.

## Idea central

La base actual está escrita en CSS tradicional a propósito. En la siguiente etapa, muchas de estas reglas podrán traducirse a clases utilitarias.

## Ejemplos de traducción conceptual

### Contenedor principal elevado

CSS actual:

- fondo translúcido
- borde suave
- sombra elevada
- radio grande
- blur de fondo

En Tailwind se pensaría con patrones del tipo:

- `rounded-[28px]`
- `border border-white/60`
- `backdrop-blur-xl`
- `shadow-[...]`
- `bg-white/70`

### Input con sombra interna

CSS actual:

- gradiente suave
- `box-shadow` inset
- radio medio
- padding consistente
- ring de foco manual

En Tailwind se traduciría a utilidades como:

- `rounded-2xl`
- `px-4 py-3`
- `bg-white/70`
- `focus:outline-none`
- `focus:ring-4 focus:ring-indigo-500/10`
- más una sombra arbitraria para el efecto inset

### Botón principal

CSS actual:

- gradiente
- color blanco para texto
- sombra externa
- hover con ligera elevación

En Tailwind:

- `bg-linear-to-br from-indigo-500 to-indigo-700`
- `text-white`
- `rounded-full`
- `shadow-[...]`
- `hover:-translate-y-0.5`
- `transition`

## Qué cambia con Tailwind 4.1

La instalación con Vite usa el plugin oficial `@tailwindcss/vite` y la hoja principal importa Tailwind con `@import "tailwindcss";`.

## Qué no cambia

Tailwind no sustituye el criterio de diseño.

Lo que debe existir antes de migrar es:

- intención visual,
- sistema de espaciado,
- jerarquía,
- estados,
- y consistencia.

Tailwind acelera la implementación de eso. No lo inventa por sí solo.
