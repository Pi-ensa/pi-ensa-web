import source from '../data/oferta-talleres.md?raw';

export interface RegistrationBanner {
  status: string;
  registrationPeriod: string;
  lateRegistration: string;
}

export interface WorkshopOffer {
  name: string;
  description: string;
  posterPdf: string;
  type: 'Vigente' | 'Histórico';
  period: string;
}

function normalize(value: string) {
  return value.trim().replace(/^\[|\]$/g, '');
}

function parseRow(line: string) {
  return line.split('|').slice(1, -1).map((cell) => cell.trim());
}

function tableRows(markdown: string, firstColumn: string) {
  const lines = markdown.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) =>
    new RegExp(`^\\|\\s*${firstColumn}\\s*\\|`, 'i').test(line),
  );
  if (headerIndex < 0) return [];

  const rows: string[][] = [];
  for (const line of lines.slice(headerIndex + 2)) {
    if (!line.trim().startsWith('|')) break;
    rows.push(parseRow(line));
  }
  return rows;
}

function parseRegistrationBanner(markdown: string): RegistrationBanner {
  const fields = Object.fromEntries(
    tableRows(markdown, 'Campo')
      .filter((cells) => cells.length >= 2)
      .map(([key, value]) => [normalize(key).toLocaleLowerCase('es'), normalize(value)]),
  );

  return {
    status: fields.estado || 'Estado por confirmar',
    registrationPeriod: fields['periodo de inscripciones'] || 'Fechas por confirmar',
    lateRegistration: fields['inscripciones extemporáneas'] || 'Fecha por confirmar',
  };
}

function parseWorkshopOffer(markdown: string): WorkshopOffer[] {
  return tableRows(markdown, 'Taller')
    .filter((cells) => cells.length >= 6)
    .filter(([, , , , , published]) => /^sí$/i.test(published.trim()))
    .map(([name, description, posterPdf, type, period]) => ({
      name: normalize(name),
      description: normalize(description),
      posterPdf: normalize(posterPdf),
      type: normalize(type) as WorkshopOffer['type'],
      period: normalize(period),
    }))
    .filter((workshop) =>
      workshop.name && workshop.description && workshop.posterPdf &&
      (workshop.type === 'Vigente' || workshop.type === 'Histórico'),
    );
}

const workshops = parseWorkshopOffer(source);

export const registrationBanner = parseRegistrationBanner(source);
export const currentWorkshopOffer = workshops.filter((workshop) => workshop.type === 'Vigente');
export const historicalWorkshopExamples = workshops.filter((workshop) => workshop.type === 'Histórico');
