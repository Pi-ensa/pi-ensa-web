# Cómo editar el sitio PI-ENSA

El contenido principal del sitio se administra desde archivos Markdown. No es necesario modificar archivos Astro, TypeScript o CSS para actualizar textos, fechas, enlaces, tarjetas o convocatorias.

## Archivos de contenido

Los archivos de las pestañas están en `src/content/paginas/`.

| Pestaña o área | Archivo |
| --- | --- |
| Inicio | `inicio.md` |
| ¿Quiénes somos? | `quienes-somos.md` |
| Inscríbete y oferta de talleres | `inscribete.md` |
| Agenda | `agenda.md` |
| Servicio social | `servicio-social.md` |
| Impacto | `impacto.md` |
| Noticias | `noticias.md` |
| Contacto | `contacto.md` |
| Preguntas frecuentes | `preguntas-frecuentes.md` |
| Menú, correo, redes y pie de página | `configuracion.md` |

Las noticias individuales se encuentran en `src/content/news/`.

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
| Título principal | Agenda de talleres |
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

- `Mostrar agenda`, dentro de `agenda.md`;
- `Mostrar fechas`, dentro de `servicio-social.md`;
- `Publicado`, en cada taller de `inscribete.md`;
- `draft`, en las noticias, donde `true` oculta la noticia y `false` la publica.

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

Esto aplica a:

- áreas de Inicio;
- talleres;
- fechas y horarios;
- fechas del servicio social;
- indicadores de Impacto;
- contenido de Impacto;
- canales de Contacto;
- preguntas frecuentes;
- navegación.

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
/documentos/carteles/robotica.pdf
```

No deben utilizarse rutas de Windows como `C:\Users\...`.

## Formularios de inscripción

Los enlaces a formularios se administran en `configuracion.md`:

- `Formulario estudiantes`;
- `Formulario participantes`.

Si `Formulario participantes` está vacío, el botón de inscripción prepara un correo al equipo PI-ENSA. Si contiene una dirección web, el botón abre ese formulario.

## Crear o editar una noticia

Cada noticia es un archivo dentro de `src/content/news/`. La parte inicial contiene sus datos:

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
