export const navigation = [
  ['Inicio', '/'], ['¿Quiénes somos?', '/programa/'], ['Talleres', '/talleres/'],
  ['Agenda', '/agenda/'], ['Participa', '/participa/'], ['Impacto', '/impacto/'],
  ['Noticias', '/noticias/'], ['Contacto', '/contacto/'],
] as const;

export const thematicAreas = [
  { name: 'Ciencias', description: 'Física, química, matemáticas y exploración experimental.' },
  { name: 'Ingeniería', description: 'Robótica, instrumentación, ingeniería civil, ambiental e industrial.' },
  { name: 'Tecnología', description: 'Programación, electrónica, videojuegos y herramientas digitales.' },
  { name: 'Salud y vida', description: 'Bioingeniería, biomédica y actividades de primeros auxilios.' },
  { name: 'Creatividad', description: 'Dibujo, diseño, comunicación y vínculos entre arte y ciencia.' },
] as const;


export const faqs = [
  { question: '¿Qué es PI-ENSA?', answer: 'Es una iniciativa de estudiantes y docentes de las Escuelas de Ciencias e Ingeniería de la UDLAP para acercar la ciencia, la tecnología, la ingeniería y las matemáticas a niñas, niños y jóvenes.' },
  { question: '¿A quiénes se dirigen los talleres?', answer: 'Históricamente han participado estudiantes de primaria, secundaria y bachillerato de escuelas públicas y privadas. Cada convocatoria puede definir edades y requisitos específicos.' },
  { question: '¿Quiénes imparten las actividades?', answer: 'Estudiantes universitarios, con acompañamiento académico, diseñan e implementan los talleres y comparten conocimientos, experiencias y vocaciones.' },
  { question: '¿Cómo me registro?', answer: 'El registro se habilita durante cada convocatoria. Para conocer el siguiente periodo, consulta la sección de Noticias o escribe al correo oficial del programa.' },
] as const;
