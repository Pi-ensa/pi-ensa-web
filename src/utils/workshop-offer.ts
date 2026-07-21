import source from '../data/oferta-talleres.md?raw';

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

function parseWorkshopOffer(markdown: string): WorkshopOffer[] {
  const lines = markdown.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => /^\|\s*Taller\s*\|/i.test(line));
  if (headerIndex < 0) return [];

  return lines
    .slice(headerIndex + 2)
    .filter((line) => line.trim().startsWith('|'))
    .map(parseRow)
    .filter((cells) => cells.length >= 4)
    .filter(([, , , published]) => /^s[ií]$/i.test(published.trim()))
    .map(([name, description, posterPdf]) => ({
      name: normalize(name),
      description: normalize(description),
      posterPdf: normalize(posterPdf),
    }))
    .filter((workshop) => workshop.name && workshop.description && workshop.posterPdf);
}

export const workshopOffer = parseWorkshopOffer(source);
