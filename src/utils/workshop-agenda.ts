import source from '../content/paginas/agenda.md?raw';
import { fields, isEnabled, tableRows } from './markdown-data';

export interface AgendaGroup {
  day: string;
  time: string;
  sessions: string[];
}

const settings = fields(source, 'Publicación');

export const agendaSettings = {
  showSchedule: isEnabled(settings['mostrar agenda']),
  alternateMessage: settings['mensaje alternativo'] || 'Periodo concluido.',
  note: settings.nota || '',
};

export const workshopAgenda: AgendaGroup[] = tableRows(source, 'Fechas y horarios')
  .filter((cells) => cells.length >= 4)
  .filter(([, , , published]) => isEnabled(published))
  .map(([day, time, dates]) => ({
    day,
    time,
    sessions: dates.split(';').map((date) => date.trim()).filter(Boolean),
  }))
  .filter((group) => group.day && group.sessions.length > 0);
