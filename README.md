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

## Cómo desplegar en Vercel

1. Sube este repositorio a GitHub, GitLab o Bitbucket.
2. Entra en [Vercel](https://vercel.com/).
3. Crea un nuevo proyecto e importa el repositorio.
4. Vercel detectará automáticamente que es una app Next.js.
5. Haz clic en **Deploy**.

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
