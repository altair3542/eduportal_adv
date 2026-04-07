# EduPortal Frontend

Proyecto base con React + Vite para práctica de formularios, validación y diseño UI.

## Inicio rápido

1. Instala Node.js LTS (recomendado 20.x).
2. Verifica versión:

```bash
node -v
npm -v
```

3. Instala dependencias:

```bash
npm install
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

5. Abre la URL que aparece en consola (normalmente http://localhost:5173).

## Scripts disponibles

```bash
npm run dev      # desarrollo
npm run build    # build de producción
npm run preview  # vista previa del build
```

## Estructura del proyecto

```text
eduportal_adv/
├─ docs/
│  ├─ design-identity.md
│  └─ tailwind-translation-guide.md
├─ src/
│  ├─ components/
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## Solución de problemas

### 1) Error por política de scripts (Windows PowerShell)

Si ves un error parecido a:

- running scripts is disabled on this system
- cannot be loaded because running scripts is disabled

Prueba, en este orden:

Opción A (temporal, solo para la terminal actual):

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev
```

Opción B (sin cambiar políticas, usando CMD):

```cmd
npm.cmd run dev
```

Opción C (abrir proyecto en Command Prompt o Git Bash):

- Ejecuta los mismos comandos de npm desde CMD o Git Bash.

Opción D (global, PowerShell como Administrador):

```powershell
Set-ExecutionPolicy -Scope LocalMachine -ExecutionPolicy RemoteSigned
```

Verificación recomendada:

```powershell
Get-ExecutionPolicy -List
```

Nota: esta opción aplica a todo el equipo. En máquinas institucionales, úsala solo si está permitida por la política de TI.

### 2) Puerto ocupado

Si Vite indica que el puerto está en uso, acepta el puerto alternativo sugerido por consola o cierra el proceso que lo ocupa.

### 3) Dependencias corruptas

Si hay errores extraños al iniciar:

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

## Contexto académico

Este proyecto sirve como base de frontend para practicar:

- componentes React
- formularios controlados
- validaciones por campo
- estado de éxito y flujo de registro
- preparación de diseño para una migración futura a Tailwind
