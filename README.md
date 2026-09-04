# PI-ENSA - sitio web

Sitio oficial de PI-ENSA, iniciativa de estudiantes y docentes de Ciencias e Ingeniería de la UDLAP para acercar experiencias STEM a niñas, niños y jóvenes.

## Edición de contenido

Las instrucciones para actualizar textos, fechas, talleres, enlaces, imágenes y noticias se encuentran en [COMO-EDITAR-EL-SITIO.md](COMO-EDITAR-EL-SITIO.md).

## Desarrollo

El repositorio utiliza pnpm y conserva sus dependencias en `pnpm-lock.yaml`.

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm check` revisa el código; `pnpm build` revisa y genera el sitio; `pnpm preview` permite revisar esa compilación. La edición local se refleja mientras `pnpm dev` permanezca en ejecución, sin enviar cambios a GitHub.

Las pruebas de las galerías se ejecutan con `python -B -m unittest discover -s scripts/tests`. Requieren `python -m pip install -r requirements-galerias.txt` y utilizan fotografías temporales, no las del sitio.

## Organización

| Carpeta o archivo | Responsabilidad |
| --- | --- |
| `src/content/paginas/` | Tablas editables de cada pestaña y configuración compartida |
| `src/content/news/` | Artículos extensos opcionales, cada uno con su propia URL |
| `src/pages/` | Rutas y composición de las páginas |
| `src/components/`, `src/layouts/`, `src/styles/` | Presentación del sitio |
| `src/utils/`, `src/config/` | Lectura de tablas, datos compartidos y enlaces |
| `public/` | Archivos servidos sin transformación: imágenes, documentos y fotografías publicables |
| `fotos_originales/` | Fotografías de entrada; su contenido está excluido de Git |
| `scripts/` | Preparación y eliminación de galerías, con pruebas en `scripts/tests/` |
| `.github/workflows/` | Publicación automática en GitHub Pages |

`node_modules/`, `.astro/` y `dist/` son carpetas generadas y están excluidas de Git. No se edita contenido en ellas. `.git/` contiene el historial del repositorio y debe conservarse.

## Compatibilidad de direcciones

Los nombres visibles pueden cambiar sin alterar las direcciones que ya se compartieron. Por eso Inscríbete conserva `/talleres/`, Horarios conserva `/agenda/` y ¿Quiénes somos? conserva `/programa/`. Sus archivos editables son `inscribete.md`, `horarios.md` y `quienes-somos.md`.

Se mantienen `/participa/` (redirección a Servicio social), `/proyectos/` y `/noticias/calendario-actividades-2026/`. Esta última es un artículo independiente aunque su tarjeta esté oculta en Noticias.

También se conservan estos PDF sin referencias internas activas, porque pueden tener enlaces compartidos fuera del sitio:

- `public/documentos/informe-actividades-pi-ensa-2015-2021.pdf`;
- `public/documentos/cartel-convocatoria-pi-ensa-2026.pdf`;
- `public/documentos/carteles/robotica.pdf`.

Su ausencia en el menú o en las tablas no implica que sean archivos temporales. Retirarlos requiere decidir primero qué hacer con sus direcciones públicas.

## GitHub Pages

La dirección actual es `https://pi-ensa.github.io/pi-ensa-web/`. El despliegue se ejecuta desde GitHub Actions con cada actualización de la rama principal.
