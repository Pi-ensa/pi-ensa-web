import source from '../data/agenda-talleres.md?raw';
import { tableRows } from './workshop-offer';

export interface AgendaGroup {
  day: string;
  time: string;
  sessions: string[];
}

const fields = Object.fromEntries(
  tableRows(source, 'Campo')
    .filter((cells) => cells.length >= 2)
    .map(([key, value]) => [key.trim().toLocaleLowerCase('es'), value.trim()]),
);

export const agendaSettings = {
  showSchedule: /^sí$/i.test(fields['mostrar agenda'] || ''),
  alternateMessage: fields['mensaje alternativo'] || 'Periodo concluido.',
  note: fields.nota || '',
};

export const workshopAgenda: AgendaGroup[] = tableRows(source, 'Día')
  .filter((cells) => cells.length >= 4)
  .filter(([, , , published]) => /^sí$/i.test(published.trim()))
  .map(([day, time, dates]) => ({
    day: day.trim(),
    time: time.trim(),
    sessions: dates.split(';').map((date) => date.trim()).filter(Boolean),
  }))
  .filter((group) => group.day && group.sessions.length > 0);
