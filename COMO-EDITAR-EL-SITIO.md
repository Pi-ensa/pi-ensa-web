# Cómo editar el sitio PI-ENSA

El contenido principal del sitio se administra desde archivos Markdown. No es necesario modificar archivos Astro, TypeScript o CSS para actualizar textos, fechas, enlaces, tarjetas o convocatorias.

## Archivos de contenido

Los archivos de las pestañas están en `src/content/paginas/`.

| Pestaña o área | Archivo |
| --- | --- |
| Inicio | `inicio.md` |
| ¿Quiénes somos? | `quienes-somos.md` |
| Inscríbete y oferta de talleres | `inscribete.md` |
| Horarios | `horarios.md` |
| Servicio social | `servicio-social.md` |
| Impacto | `impacto.md` |
| Noticias | `noticias.md` |
| Contacto y preguntas frecuentes | `contacto.md` |
| Aviso emergente del Inicio | `aviso-general.md` |
| Menú, descripción general, URL y textos del pie de página | `configuracion.md` |

La lista principal de noticias se administra en `noticias.md`. Los artículos internos con contenido extenso se encuentran en `src/content/news/`.

## Regla principal

Se pueden modificar los textos dentro de las tablas, pero no deben cambiarse:

- los encabezados que comienzan con `##`;
- los nombres de las columnas;
- los nombres de los campos de la primera columna;
- las rutas de los archivos Markdown.

La aplicación usa esos nombres para identificar cada dato.

## Editar un texto

En las tablas de dos columnas, el nombre del dato está a la izquierda y el contenido editable está a la derecha:

```md
| Campo | Valor |
| --- | --- |
| Título principal | Horario de talleres |
| Introducción | Consulta las fechas y horarios publicados para cada grupo. |
```

Para actualizar la página, sólo se cambia el contenido de la columna `Valor`.

El carácter `|` forma parte de la sintaxis de las tablas. Si debe aparecer dentro de un texto, se escribe como `\|`.

## Título del navegador

El campo `Título del navegador` controla el texto de la pestaña del navegador y los metadatos usados al compartir la página. No aparece como encabezado dentro del contenido.

Para modificar el encabezado visible se utiliza el campo `Título principal` de la misma página.

El campo `Etiqueta` controla el texto azul pequeño que aparece encima del título principal. En Inicio, este dato se encuentra en la tabla `Presentación`; en las demás pestañas está dentro de la tabla `Página`.

## Mostrar u ocultar contenido

Los controles de publicación aceptan:

- `Sí` o `Si`: muestra el contenido;
- `No`: conserva el contenido en el archivo, pero lo oculta en el sitio.

Estos controles se encuentran en:

- `Mostrar horarios`, dentro de `horarios.md`;
- `Mostrar fechas`, dentro de `servicio-social.md`;
- `Publicado`, en cada taller de `inscribete.md`;
- `Mostrar`, en cada noticia de `noticias.md`;
- `Mostrar`, dentro de `aviso-general.md`.

## Publicar noticias y galerías

Cada fila de la tabla `Noticias publicadas` en `noticias.md` genera una tarjeta. El campo `Enlace` acepta una ruta interna, por ejemplo `/agenda/`, o una dirección externa completa. El campo `Popup` se deja vacío cuando la noticia no necesita una ventana emergente; para una galería se escribe `Galería`, que será el texto del botón. El campo `Mostrar` acepta `Sí`, `Si` o `No`.

La columna `Galería` vincula una noticia con la carpeta `graduacion` o `talleres_periodo`; se deja vacía en noticias sin fotografías. Cada carpeta se asigna a una sola noticia. El título de la noticia se puede cambiar libremente desde la tabla, sin editar Python ni cambiar la carpeta.

Las fotografías originales se colocan en:

- `fotos_originales/graduacion/`;
- `fotos_originales/talleres_periodo/`.

Después se ejecuta:

```powershell
python scripts/preparar_galerias.py
```

El script corrige la orientación, reduce las dimensiones, convierte las imágenes a WebP, las renombra como `001.webp`, `002.webp` y sucesivamente, reemplaza las fotografías publicables de las galerías asignadas y actualiza la tabla `Galerías de noticias`. Esa tabla se genera automáticamente: no es necesario editarla. Los resultados se guardan en `public/fotos_publicables/graduacion/` y `public/fotos_publicables/talleres_periodo/`. Las fotografías originales no se envían a GitHub; las publicables sí. El script no cambia el campo `Mostrar` de las noticias.

Si falta la biblioteca de imágenes, se instala una sola vez con `python -m pip install -r requirements-galerias.txt`.

Para retirar por completo las fotografías originales y publicables de ambas galerías se ejecuta `python scripts/elminar_galeria_historico.py`. El script solicita escribir `ELIMINAR`, conserva las carpetas y sus archivos `.gitkeep`, y vacía automáticamente la tabla `Galerías de noticias`. Es una eliminación local definitiva de los originales: guarda una copia si necesitas conservarlos. No borra fotografías de commits anteriores ni libera su espacio en el historial de Git.

## Aviso general del Inicio

El archivo `aviso-general.md` controla la ventana que puede aparecer al abrir Inicio. `Mostrar | Sí` activa el aviso y `Mostrar | No` lo conserva oculto. El botón y el enlace son opcionales.

## Preguntas y canales de contacto

Las preguntas frecuentes y sus respuestas se administran como filas dentro de `contacto.md`. En la tabla `Canales de comunicación`, cada canal tiene su propio enlace y un campo `Mostrar`. Correo y Facebook están publicados; teléfono, Instagram, LinkedIn y YouTube pueden prepararse con anticipación y activarse cambiando `No` por `Sí` cuando exista un enlace oficial.

El correo y la dirección de Facebook del pie de página se toman de esta misma tabla. No es necesario duplicarlos en `configuracion.md`. Si `Texto del enlace` está vacío, se muestra la dirección del canal sin el prefijo `mailto:` o `tel:`. El correo también se utiliza como destino alternativo cuando no hay formulario de inscripción; ocultar su tarjeta no elimina esa dirección de contacto del sitio.

## Cambiar el fondo de una sección

Las secciones que tienen un campo `Diseño` admiten estos valores:

| Valor | Resultado |
| --- | --- |
| `Principal` | Presentación principal de Inicio |
| `Azul` | Fondo azul institucional |
| `Claro` | Fondo azul muy claro |
| `Blanco` | Fondo blanco |

Debe usarse exactamente uno de esos valores. Los colores, espacios, tipografías y adaptación a teléfonos permanecen controlados por el sitio.

## Agregar, quitar u ordenar tarjetas

Las tarjetas se administran como filas. Para agregar una, se copia una fila completa y se modifican sus celdas. Para quitarla, se elimina la fila. El orden de las filas es el orden que se muestra en la página.

Esto no cambia el orden de las secciones completas: mover una tabla dentro del Markdown, o a otro archivo, no mueve su bloque en el sitio. La posición de los bloques se define en las plantillas de `src/pages/`.

Esto aplica a:

- áreas de Inicio;
- talleres;
- horarios de talleres;
- fechas del servicio social;
- indicadores de Impacto;
- contenido de Impacto;
- canales de Contacto;
- preguntas frecuentes;
- navegación.

## Horarios de talleres

Cada fila de la tabla `Horarios de talleres` en `horarios.md` genera un renglón con taller, horario, salón, fechas y observaciones. La columna `Publicado` acepta `Sí`, `Si` o `No` y no se muestra en el sitio. El encabezado colocado antes de la tabla se construye con los campos `Periodo`, `Modalidad` y `Duración` de la tabla `Publicación`. La dirección pública continúa siendo `/agenda/` para conservar los enlaces existentes.

## Información de inscripción

La explicación general, los requisitos y los pasos del registro se administran en `inscribete.md`. Las tablas `Requisitos de registro` y `Pasos del registro` permiten agregar, eliminar o reordenar elementos. En los pasos, `Texto destacado` muestra una frase en negritas y subrayada. `Botón` y `Enlace` son opcionales; si se escribe un botón sin enlace, se utiliza `Enlace del formulario` de la tabla `Información de inscripción` del mismo archivo.

## Pasos del servicio social

El campo `Calendario a publicar` de `servicio-social.md` acepta `Ordinario` o `Verano`. El calendario ordinario se usa para primavera y otoño; el de verano se usa para los proyectos especiales. Cada fila de la tabla seleccionada genera un recuadro numerado en la línea del proceso. Para agregar un paso se añade una fila; para eliminarlo se elimina su fila. La numeración y la posición se calculan automáticamente.

En el calendario de verano, las columnas `Botón` y `Enlace` son opcionales. El enlace `#proyectos-especiales` abre la ventana con los proyectos registrados en la tabla `Proyectos especiales ofertados`; cualquier dirección web abre el sistema indicado en una pestaña nueva.

## Publicar un taller

1. Copiar el cartel PDF a `public/documentos/carteles/`.
2. Abrir `src/content/paginas/inscribete.md`.
3. Completar una fila de la tabla `Talleres`.
4. Escribir una ruta como `/documentos/carteles/nombre-del-cartel.pdf`.
5. Cambiar `Publicado` a `Sí`.

Si `Publicado` tiene el valor `No`, el taller no aparece en el sitio.

## Imágenes y documentos

- Las imágenes generales se guardan en `public/images/`.
- Los carteles PDF se guardan en `public/documentos/carteles/`.
- Otros documentos se guardan en `public/documentos/`.

Las rutas escritas en Markdown comienzan con `/`. Por ejemplo:

```text
/images/general/estudiantes-pi-ensa.png
/documentos/carteles/nombre-del-cartel.pdf
```

No deben utilizarse rutas de Windows como `C:\Users\...`.

## Formularios de inscripción

El formulario de niñas, niños y jóvenes se configura una sola vez en `inscribete.md`, campo `Enlace del formulario` de la tabla `Información de inscripción`. Alimenta tanto el botón inferior de inscripción como los pasos que tienen botón pero no enlace propio. Si está vacío, esos botones preparan un correo al equipo PI-ENSA.

Los enlaces de postulación de estudiantes UDLAP se editan en las filas correspondientes de los calendarios de `servicio-social.md`.

## Artículos extensos de noticias (opcional)

Para una noticia breve basta con la tabla `Noticias publicadas` de `noticias.md`. Sólo cuando necesita una página propia con contenido extenso se crea un archivo dentro de `src/content/news/`. La parte inicial contiene sus datos:

```md
---
title: Título de la noticia
summary: Resumen breve
publishedDate: 2026-02-16
author: PI-ENSA
tags: ["Agenda", "Talleres"]
draft: false
---
```

Después de la segunda línea `---` se escribe el contenido normal de la noticia con Markdown.

El nombre del archivo determina su dirección: `nombre.md` genera `/noticias/nombre/`. Esa dirección se coloca en el campo `Enlace` de la tarjeta. `draft: true` impide generar el artículo; `draft: false` lo publica. El campo `Mostrar` de la tabla sólo controla la tarjeta, no la existencia del artículo. Ocultar una tarjeta no retira una página que ya tiene enlace propio.

## Editar desde GitHub

1. Abrir el repositorio en GitHub.
2. Entrar a `src/content/paginas/`.
3. Abrir el archivo correspondiente.
4. Presionar el botón del lápiz.
5. Modificar únicamente los valores necesarios.
6. Revisar la pestaña de vista previa.
7. Guardar el cambio con un mensaje breve y descriptivo.

El sitio se vuelve a publicar automáticamente después de guardar en la rama configurada para GitHub Pages.

## Antes de guardar

Comprobar que:

- cada fila comienza y termina con `|`;
- no se eliminaron las líneas separadoras de las tablas;
- los controles usan `Sí`, `Si` o `No`;
- las rutas comienzan con `/`;
- los nombres de los archivos coinciden, incluyendo mayúsculas, minúsculas y extensión;
- no se cambiaron encabezados ni nombres de campos.

Si una edición produce un error, se puede revertir el commit desde el historial de GitHub.
