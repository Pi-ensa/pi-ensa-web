import source from '../content/paginas/inscribete.md?raw';
import { fields, isEnabled, tableRows } from './markdown-data';

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

const registration = fields(source, 'Fechas de inscripción');

export const registrationBanner: RegistrationBanner = {
  workshopPeriod: registration['periodo de talleres'] || 'Periodo por confirmar',
  agendaPeriod: registration['periodo de agenda'] || 'PERIODO POR CONFIRMAR',
  status: registration.estado || 'Estado por confirmar',
  registrationDates: registration.inscripciones || 'Fechas por confirmar',
  lateRegistration: registration['inscripciones extemporáneas'] || 'Fecha por confirmar',
};

export const workshopOffer: WorkshopOffer[] = tableRows(source, 'Talleres')
  .filter((cells) => cells.length >= 4)
  .filter(([, , , published]) => isEnabled(published))
  .map(([name, description, posterPdf]) => ({ name, description, posterPdf }))
  .filter((workshop) => workshop.name && workshop.description && workshop.posterPdf);
