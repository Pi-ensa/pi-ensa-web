# PI-ENSA - sitio web

Sitio oficial de PI-ENSA, iniciativa de estudiantes y docentes de Ciencias e Ingeniería de la UDLAP para acercar experiencias STEM a niñas, niños y jóvenes.

## Desarrollo

`npm install`, `npm run dev`, `npm run check`, `npm run build` y `npm run preview`.

## Publicar la oferta de talleres

El aviso de inscripciones y la oferta se administran desde `src/data/oferta-talleres.md`.

La primera tabla controla los periodos mostrados en Talleres y Agenda, el estado y las fechas de inscripción. La segunda tabla contiene el nombre, la descripción, la ruta del cartel PDF y el estado de publicación de cada taller.

Para publicar:

1. Copia el cartel a `public/documentos/carteles/`.
2. Agrega una fila en la tabla **Talleres**.
3. Usa una ruta como `/documentos/carteles/nombre-del-cartel.pdf`.
4. Escribe `Sí` en **Publicado**.
5. Ejecuta `npm run build` para verificar.

Las filas con `No` se conservan como borradores y no aparecen en el sitio. Si no hay talleres publicados, la página muestra únicamente el aviso de inscripciones.

## Otras áreas de edición

- Configuración general y formulario: `src/config/site.ts`
- Navegación y preguntas frecuentes: `src/data/site-data.ts`
- Agenda de talleres y control de publicación: `src/data/agenda-talleres.md`
- Proceso de estudiantes UDLAP: `src/data/proceso-estudiantes.md`
- Noticias: `src/content/news/`
- Imágenes: `public/images/`
- Diseño y colores: `src/styles/global.css`

## Datos históricos

El indicador de 1,413 corresponde a participaciones registradas entre Otoño 2015 y Primavera 2021: 603 en Otoño y 810 en Primavera. No representa necesariamente 1,413 personas únicas.

## GitHub Pages

La base actual es `https://pi-ensa.github.io/pi-ensa-web/`. El despliegue se ejecuta desde GitHub Actions con cada push a `main`.
