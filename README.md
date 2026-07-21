# PI-ENSA â€” sitio web

Estructura inicial del sitio oficial. Esta etapa contiene la base tÃ©cnica y marcadores; la informaciÃ³n institucional estÃ¡ pendiente de validaciÃ³n.

## Desarrollo

`npm install`, `npm run dev`, `npm run check`, `npm run build` y `npm run preview`.

## EdiciÃ³n

- Sitio y Microsoft Forms: `src/config/site.ts`
- DiseÃ±o: `src/styles/global.css`
- NavegaciÃ³n y datos: `src/data/site-data.ts`
- Proyectos, noticias y testimonios: `src/content/`
- ImÃ¡genes y logotipos: `public/images/` y `public/logos/`

## GitHub Pages

La base actual es `https://pi-ensa.github.io/pi-ensa-web/`. En **Settings â†’ Pages**, selecciona **GitHub Actions**. Para dominio propio o repositorio raÃ­z, cambia `site` y `base` en `astro.config.mjs`, la URL en `src/config/site.ts` y el sitemap en `public/robots.txt`.

No se han agregado proyectos, noticias, testimonios, cifras, personas, organizaciones, formularios ni datos de contacto.
