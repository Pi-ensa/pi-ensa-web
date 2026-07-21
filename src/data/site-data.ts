export const navigation = [
  ['Inicio', '/'], ['El programa', '/programa/'], ['Proyectos', '/proyectos/'],
  ['Participa', '/participa/'], ['Impacto', '/impacto/'], ['Noticias', '/noticias/'], ['Contacto', '/contacto/'],
] as const;
export const areas: Array<{ name: string; description: string }> = [];
export const faqs: Array<{ category: string; question: string; answer: string }> = [];
export const team: Array<{ name: string; role: string; image?: string }> = [];
