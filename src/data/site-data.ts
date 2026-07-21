export const navigation = [
  ['Inicio', '/'], ['¿Quiénes somos?', '/programa/'], ['Talleres', '/talleres/'],
  ['Agenda 2026', '/agenda/'], ['Participa', '/participa/'], ['Impacto', '/impacto/'],
  ['Noticias', '/noticias/'], ['Contacto', '/contacto/'],
] as const;

export const thematicAreas = [
  { name: 'Ciencias', description: 'Física, química, matemáticas y exploración experimental.' },
  { name: 'Ingeniería', description: 'Robótica, instrumentación, ingeniería civil, ambiental e industrial.' },
  { name: 'Tecnología', description: 'Programación, electrónica, videojuegos y herramientas digitales.' },
  { name: 'Salud y vida', description: 'Bioingeniería, biomédica y actividades de primeros auxilios.' },
  { name: 'Creatividad', description: 'Dibujo, diseño, comunicación y vínculos entre arte y ciencia.' },
] as const;

export const workshopSchedule2026 = [
  { day: 'Lunes', sessions: ['Taller 1 · 16 feb', 'Taller 2 · 23 feb', 'Taller 3 · 2 mar', 'Taller 4 · 9 mar', 'Taller 5 · 23 mar', 'Taller 6 · 13 abr', 'Taller 7 · 20 abr', 'Taller 8 · 27 abr'] },
  { day: 'Martes', sessions: ['Taller 1 · 17 feb', 'Taller 2 · 24 feb', 'Taller 3 · 3 mar', 'Taller 4 · 10 mar', 'Taller 5 · 17 mar', 'Taller 6 · 24 mar', 'Taller 7 · 14 abr', 'Taller 8 · 21 abr'] },
  { day: 'Miércoles', sessions: ['Taller 1 · 18 feb', 'Taller 2 · 25 feb', 'Taller 3 · 4 mar', 'Taller 4 · 11 mar', 'Taller 5 · 18 mar', 'Taller 6 · 25 mar', 'Taller 7 · 15 abr', 'Taller 8 · 22 abr'] },
  { day: 'Jueves', sessions: ['Taller 1 · 19 feb', 'Taller 2 · 26 feb', 'Taller 3 · 5 mar', 'Taller 4 · 12 mar', 'Taller 5 · 19 mar', 'Taller 6 · 26 mar', 'Taller 7 · 16 abr', 'Taller 8 · 23 abr'] },
  { day: 'Viernes', sessions: ['Taller 1 · 20 feb', 'Taller 2 · 27 feb', 'Taller 3 · 13 mar', 'Taller 4 · 20 mar', 'Taller 5 · 27 mar', 'Taller 6 · 17 abr', 'Taller 7 · 24 abr', 'Taller 8 · 8 may'] },
  { day: 'Sábado', sessions: ['Taller 1 · 21 feb', 'Taller 2 · 28 feb', 'Taller 3 · 14 mar', 'Taller 4 · 21 mar', 'Taller 5 · 28 mar', 'Taller 6 · 18 abr', 'Taller 7 · 25 abr', 'Taller 8 · 2 may'] },
] as const;

export const faqs = [
  { question: '¿Qué es PI-ENSA?', answer: 'Es una iniciativa de estudiantes y docentes de las Escuelas de Ciencias e Ingeniería de la UDLAP para acercar la ciencia, la tecnología, la ingeniería y las matemáticas a niñas, niños y jóvenes.' },
  { question: '¿A quiénes se dirigen los talleres?', answer: 'Históricamente han participado estudiantes de primaria, secundaria y bachillerato de escuelas públicas y privadas. Cada convocatoria puede definir edades y requisitos específicos.' },
  { question: '¿Quiénes imparten las actividades?', answer: 'Estudiantes universitarios, con acompañamiento académico, diseñan e implementan los talleres y comparten conocimientos, experiencias y vocaciones.' },
  { question: '¿Cómo me registro?', answer: 'El registro se habilita durante cada convocatoria. Para conocer el siguiente periodo, consulta la sección de Noticias o escribe al correo oficial del programa.' },
] as const;
