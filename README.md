# PI-ENSA — sitio web

Sitio oficial de PI-ENSA, iniciativa de estudiantes y docentes de Ciencias e Ingeniería de la UDLAP para acercar experiencias STEM a niñas, niños y jóvenes.

## Desarrollo

`npm install`, `npm run dev`, `npm run check`, `npm run build` y `npm run preview`.

## Publicar la oferta de talleres

La oferta se administra desde una sola tabla Markdown:

`src/data/oferta-talleres.md`

Cada fila contiene:

- nombre del taller;
- descripción breve;
- ruta del cartel PDF;
- estado de publicación.

Para publicar:

1. Copia el cartel a `public/documentos/carteles/`.
2. Agrega una fila en la tabla de `oferta-talleres.md`.
3. Usa una ruta como `/documentos/carteles/robotica.pdf`.
4. Escribe `Sí` en **Publicado**.
5. Ejecuta `npm run build` para verificar.

Las filas con `No` se conservan como borradores y no aparecen en el sitio.

## Otras áreas de edición

- Configuración general y formulario: `src/config/site.ts`
- Navegación, áreas, agenda y FAQ: `src/data/site-data.ts`
- Noticias: `src/content/news/`
- Imágenes: `public/images/`
- Diseño y colores: `src/styles/global.css`

## Datos históricos

El indicador de 1,413 corresponde a participaciones registradas entre Otoño 2015 y Primavera 2021: 603 en Otoño y 810 en Primavera. No representa necesariamente 1,413 personas únicas.

## GitHub Pages

La base actual es `https://pi-ensa.github.io/pi-ensa-web/`. El despliegue se ejecuta desde GitHub Actions con cada push a `main`.
