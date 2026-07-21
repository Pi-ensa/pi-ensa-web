import source from '../data/proceso-estudiantes.md?raw';
import { tableRows } from './workshop-offer';

const fields = Object.fromEntries(
  tableRows(source, 'Campo')
    .filter((cells) => cells.length >= 2)
    .map(([key, value]) => [key.trim().toLocaleLowerCase('es'), value.trim()]),
);

export const studentProcessSettings = {
  status: fields.estado || 'Proceso por confirmar.',
  message: fields.mensaje || '',
  note: fields.nota || '',
};

export const studentProcessDates = tableRows(source, 'Fecha')
  .filter((cells) => cells.length >= 4)
  .filter(([, , , published]) => /^sí$/i.test(published.trim()))
  .map(([date, title, description]) => ({
    date: date.trim(),
    title: title.trim(),
    description: description.trim(),
  }))
  .filter((item) => item.date && item.title && item.description);
