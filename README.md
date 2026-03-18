# Torneo Interno de Futbol de TR

Aplicación web construida con Next.js, React, TypeScript y Tailwind CSS para mostrar la tabla de posiciones de un torneo interno de fútbol. El proyecto está preparado para despliegue en Vercel y usa datos locales fáciles de editar.

## Características

- Interfaz moderna, responsiva y centrada.
- Tabla de posiciones con orden automático por puntos, diferencia de gol y goles a favor.
- Indicador visual de los últimos 5 partidos con emojis.
- Top 3 resaltado visualmente.
- Datos del torneo almacenados localmente en un archivo TypeScript sencillo de mantener.

## Estructura principal

- `app/page.tsx`: página principal.
- `components/Table.tsx`: componente de la tabla de posiciones.
- `data/teams.ts`: datos editables de los equipos y lógica de ordenamiento.
- `styles/globals.css`: estilos globales de Tailwind.

## Cómo ejecutar localmente

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Abre `http://localhost:3000` en tu navegador.

## Cómo desplegar en GitHub + Vercel

### Opción 1: subir primero a GitHub

1. Crea un nuevo repositorio en GitHub.
2. Desde tu máquina local, inicializa el repositorio si hace falta:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Conecta el repositorio remoto y sube el código:

   ```bash
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git branch -M main
   git push -u origin main
   ```

### Opción 2: desplegar desde la app de Vercel

1. Entra en [Vercel](https://vercel.com/) y crea una cuenta o inicia sesión.
2. Haz clic en **Add New...** → **Project**.
3. Importa el repositorio de GitHub donde subiste este proyecto.
4. Vercel detectará automáticamente que es una aplicación Next.js.
5. Verifica estas opciones:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `/`
   - **Build Command**: `next build` (o dejar el valor por defecto)
   - **Output Directory**: `.next` (o dejar el valor por defecto)
6. No necesitas variables de entorno para esta app.
7. Haz clic en **Deploy**.

### Qué pasa después del deploy

- Vercel generará una URL pública automáticamente.
- Cada nuevo `git push` a la rama principal podrá disparar un nuevo deploy.
- Si editas `data/teams.ts`, haz commit y push para publicar los cambios actualizados.

## Dónde editar los datos de los equipos

Edita el archivo `data/teams.ts`. Cada objeto contiene:

- `name`
- `played`
- `wins`
- `draws`
- `losses`
- `goalsFor`
- `goalsAgainst`
- `points`
- `last5` (usa `W`, `D`, `L`)

Después de guardar los cambios, la tabla se reordenará automáticamente según los criterios configurados.

## Scripts disponibles

- `npm run dev`: inicia el entorno local.
- `npm run build`: genera la build de producción.
- `npm run start`: sirve la build generada.
- `npm run lint`: ejecuta el linter de Next.js.
- `npm run typecheck`: valida tipos con TypeScript.
