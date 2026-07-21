# PI-ENSA - sitio web

Sitio oficial de PI-ENSA, iniciativa de estudiantes y docentes de Ciencias e Ingeniería de la UDLAP para acercar experiencias STEM a niñas, niños y jóvenes.

## Desarrollo

`npm install`, `npm run dev`, `npm run check`, `npm run build` y `npm run preview`.

## Publicar la oferta de talleres

La oferta y el aviso de inscripciones se administran desde:

`src/data/oferta-talleres.md`

La primera tabla controla estos textos del banner:

- estado de las inscripciones;
- periodo ordinario;
- fecha límite para inscripciones extemporáneas.

La segunda tabla contiene cada taller, su descripción, la ruta del cartel, el tipo de publicación, el periodo y su estado.

Para publicar:

1. Copia el cartel a `public/documentos/carteles/`.
2. Agrega una fila en la tabla **Talleres**.
3. Usa una ruta como `/documentos/carteles/nombre-del-cartel.pdf`.
4. Escribe `Vigente` para la oferta actual o `Histórico` para el archivo de ejemplos.
5. Escribe `Sí` en **Publicado**.
6. Ejecuta `npm run build` para verificar.

Las filas con `No` se conservan como borradores y no aparecen en el sitio.

## Otras áreas de edición

- Configuración general y formulario: `src/config/site.ts`
- Navegación, agenda y preguntas frecuentes: `src/data/site-data.ts`
- Proceso de estudiantes UDLAP: `src/pages/servicio-social.astro`
- Noticias: `src/content/news/`
- Imágenes: `public/images/`
- Diseño y colores: `src/styles/global.css`

## Datos históricos

El indicador de 1,413 corresponde a participaciones registradas entre Otoño 2015 y Primavera 2021: 603 en Otoño y 810 en Primavera. No representa necesariamente 1,413 personas únicas.

## GitHub Pages

La base actual es `https://pi-ensa.github.io/pi-ensa-web/`. El despliegue se ejecuta desde GitHub Actions con cada push a `main`.
