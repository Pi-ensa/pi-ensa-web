import source from '../data/oferta-talleres.md?raw';

export interface RegistrationBanner {
  workshopPeriod: string;
  agendaPeriod: string;
  status: string;
  registrationDates: string;
  lateRegistration: string;
}

export interface WorkshopOffer {
  name: string;
  description: string;
  posterPdf: string;
}

function normalize(value: string) {
  return value.trim().replace(/^\[|\]$/g, '');
}

function parseRow(line: string) {
  return line.split('|').slice(1, -1).map((cell) => cell.trim());
}

export function tableRows(markdown: string, firstColumn: string) {
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
    workshopPeriod: fields['periodo de talleres'] || 'Periodo por confirmar',
    agendaPeriod: fields['periodo de agenda'] || 'PERIODO POR CONFIRMAR',
    status: fields.estado || 'Estado por confirmar',
    registrationDates: fields.inscripciones || 'Fechas por confirmar',
    lateRegistration: fields['inscripciones extemporáneas'] || 'Fecha por confirmar',
  };
}

function parseWorkshopOffer(markdown: string): WorkshopOffer[] {
  return tableRows(markdown, 'Taller')
    .filter((cells) => cells.length >= 4)
    .filter(([, , , published]) => /^sí$/i.test(published.trim()))
    .map(([name, description, posterPdf]) => ({
      name: normalize(name),
      description: normalize(description),
      posterPdf: normalize(posterPdf),
    }))
    .filter((workshop) => workshop.name && workshop.description && workshop.posterPdf);
}

export const registrationBanner = parseRegistrationBanner(source);
export const workshopOffer = parseWorkshopOffer(source);
