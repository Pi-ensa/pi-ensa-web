import source from '../content/paginas/servicio-social.md?raw';
import { fields, isEnabled, tableRows } from './markdown-data';

const settings = fields(source, 'Información general');

export const studentProcessSettings = {
  showDates: isEnabled(settings['mostrar fechas']),
  status: settings.estado || 'Proceso por confirmar.',
  message: settings.mensaje || '',
  note: settings.nota || '',
};

export const studentProcessDates = tableRows(source, 'Fechas del proceso')
  .filter((cells) => cells.length >= 3)
  .map(([date, title, description]) => ({ date, title, description }))
  .filter((item) => item.date && item.title && item.description);
