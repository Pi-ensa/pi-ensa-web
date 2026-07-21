export const navigation = [
  ['Inicio', '/'], ['El programa', '/programa/'], ['Talleres', '/talleres/'],
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

export const agenda2026 = [
  { date: '12 de enero', title: 'Inicio de clases', category: 'Preparación' },
  { date: '23 de enero', title: 'Sesión informativa en línea', category: 'Reclutamiento' },
  { date: '24 de enero', title: 'Envío de encuesta', category: 'Reclutamiento' },
  { date: '26 y 27 de enero', title: 'Dinámicas de reclutamiento', category: 'Reclutamiento' },
  { date: '30 de enero', title: 'Notificación de aceptación', category: 'Reclutamiento' },
  { date: '3 de febrero', title: 'Inicio de actividades e integración de equipos', category: 'Formación' },
  { date: '4 de febrero', title: 'Taller “Enseñar a enseñar” 1', category: 'Formación' },
  { date: '4 al 10 de febrero', title: 'Promoción de talleres', category: 'Difusión' },
  { date: '11 al 13 de febrero', title: 'Inscripciones', category: 'Inscripción' },
  { date: '16 de febrero al 8 de mayo', title: 'Desarrollo de ocho bloques de talleres', category: 'Talleres' },
] as const;

export const faqs = [
  { question: '¿Qué es PI-ENSA?', answer: 'Es una iniciativa de estudiantes y docentes de las Escuelas de Ciencias e Ingeniería de la UDLAP para acercar la ciencia, la tecnología, la ingeniería y las matemáticas a niñas, niños y jóvenes.' },
  { question: '¿A quiénes se dirigen los talleres?', answer: 'Históricamente han participado estudiantes de primaria, secundaria y bachillerato de escuelas públicas y privadas. Cada convocatoria puede definir edades y requisitos específicos.' },
  { question: '¿Quiénes imparten las actividades?', answer: 'Estudiantes universitarios, con acompañamiento académico, diseñan e implementan los talleres y comparten conocimientos, experiencias y vocaciones.' },
  { question: '¿Cómo me registro?', answer: 'El registro se habilita durante cada convocatoria. Para conocer el siguiente periodo, consulta la sección de Noticias o escribe al correo oficial del programa.' },
] as const;
