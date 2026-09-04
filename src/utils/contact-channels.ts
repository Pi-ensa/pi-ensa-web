import source from '../content/paginas/contacto.md?raw';
import { isEnabled, tableRows } from './markdown-data';

export const contactChannels = tableRows(source, 'Canales de comunicación')
  .filter((row) => row.length >= 6)
  .map(([type, label, title, linkText, link, show]) => ({
    type,
    label,
    title,
    linkText: linkText || link.replace(/^(mailto:|tel:)/i, ''),
    link,
    show: isEnabled(show),
  }));

export const visibleContactChannels = contactChannels
  .filter((channel) => channel.title && channel.link && channel.show);

export const contactEmail = contactChannels.find((channel) => /^mailto:/i.test(channel.link))
  ?.link.replace(/^mailto:/i, '').split('?')[0] || '';

export const facebookUrl = visibleContactChannels.find((channel) => channel.type.toLowerCase() === 'facebook')?.link || '';
