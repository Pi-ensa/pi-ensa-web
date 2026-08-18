import source from '../content/paginas/agenda.md?raw';
import { fields, isEnabled, tableRows } from './markdown-data';

export interface WorkshopSchedule {
  workshop: string;
  time: string;
  room: string;
  dates: string;
  notes: string;
}

const settings = fields(source, 'Publicación');

export const agendaSettings = {
  showSchedule: isEnabled(settings['mostrar horarios']),
  alternateMessage: settings['mensaje alternativo'] || 'Periodo concluido.',
  period: settings.periodo || 'Periodo por confirmar',
  modality: settings.modalidad || 'presencial',
  duration: settings['duración'] || 'dos horas a la semana en un mismo día',
  note: settings.nota || '',
};

export const workshopAgenda: WorkshopSchedule[] = tableRows(source, 'Horarios de talleres')
  .filter((cells) => cells.length >= 6)
  .filter(([, , , , , published]) => isEnabled(published))
  .map(([workshop, time, room, dates, notes]) => ({
    workshop,
    time,
    room,
    dates,
    notes,
  }))
  .filter((schedule) => schedule.workshop && schedule.time);
