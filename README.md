# PI-ENSA — sitio web

Sitio oficial de PI-ENSA, iniciativa de estudiantes y docentes de Ciencias e Ingeniería de la UDLAP para acercar experiencias STEM a niñas, niños y jóvenes.

## Desarrollo

`npm install`, `npm run dev`, `npm run check`, `npm run build` y `npm run preview`.

## Agregar un taller

1. Duplica `src/content/workshops/_plantilla.md`.
2. Renombra el archivo con una URL clara, por ejemplo `robotica-basica.md`.
3. Completa título, resumen, área, público, modalidad, fechas, horario, estado y enlace de inscripción.
4. Sustituye el contenido de ejemplo.
5. Cambia `draft: true` por `draft: false` para publicarlo.

Cada archivo genera automáticamente una tarjeta en `/talleres/` y una página individual.

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
