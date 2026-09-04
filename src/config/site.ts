import source from '../content/paginas/configuracion.md?raw';
import { fields, tableRows } from '../utils/markdown-data';
import { contactEmail, facebookUrl } from '../utils/contact-channels';

const site = fields(source, 'Sitio');
export const SITE = {
  description: site['descripción'],
  siteUrl: site.url,
  contactEmail,
  socialLinks: { facebook: facebookUrl },
} as const;

export const navigation = tableRows(source, 'Navegación')
  .filter(([label, path]) => label && path)
  .map(([label, path]) => [label, path] as const);
