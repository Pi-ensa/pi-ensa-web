import source from '../content/paginas/servicio-social.md?raw';
import { fields, isEnabled, tableRows } from './markdown-data';

const settings = fields(source, 'Información general');

export const studentProcessSettings = {
  showDates: isEnabled(settings['mostrar fechas']),
  calendar: /^verano$/i.test(settings['calendario a publicar']?.trim() || '') ? 'verano' : 'ordinario',
  status: settings.estado || 'Proceso por confirmar.',
  message: settings.mensaje || '',
  note: settings.nota || '',
};

const processHeading = studentProcessSettings.calendar === 'verano'
  ? 'Fechas del proceso de verano'
  : 'Fechas del proceso ordinario';

export const studentProcessDates = tableRows(source, processHeading)
  .filter((cells) => cells.length >= 3)
  .map(([date, title, description, button, link]) => ({ date, title, description, button, link }))
  .filter((item) => item.title && item.description);

export const specialProjects = tableRows(source, 'Proyectos especiales ofertados')
  .filter((cells) => cells.length >= 2)
  .map(([title, description, activities, profile, places]) => ({ title, description, activities, profile, places }))
  .filter((item) => item.title && item.description);
