import source from '../content/paginas/configuracion.md?raw';
import { fields, tableRows } from '../utils/markdown-data';

const site = fields(source, 'Sitio');
const social = Object.fromEntries(
  tableRows(source, 'Redes sociales').map(([name, url]) => [name.toLocaleLowerCase('es'), url]),
);

export const SITE = {
  name: site.nombre,
  title: site['título'],
  description: site['descripción'],
  siteUrl: site.url,
  basePath: site['ruta base'],
  contactEmail: site.correo,
  studentFormUrl: site['formulario estudiantes'],
  participantFormUrl: site['formulario participantes'],
  socialLinks: {
    facebook: social.facebook || '',
    instagram: social.instagram || '',
    linkedin: social.linkedin || '',
    youtube: social.youtube || '',
  },
} as const;
