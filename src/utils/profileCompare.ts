// Diccionario amplio de habilidades/términos relevantes del ámbito profesional tecnológico y administrativo.
// Se usa para extraer conceptos de los textos sin depender de una API externa.
export const SKILL_DICTIONARY: string[] = [
  // Lenguajes de programación
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'kotlin', 'swift', 'sql', 'html', 'css', 'rust',
  // Frameworks / librerías
  'react', 'angular', 'vue', 'node.js', 'next.js', 'django', 'flask', 'spring', 'laravel', 'express', 'tailwind', 'bootstrap',
  // Bases de datos
  'postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'firebase', 'supabase', 'oracle', 'sql server',
  // Cloud / DevOps
  'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins', 'terraform', 'linux', 'bash',
  // Herramientas / metodologías
  'git', 'github', 'jira', 'scrum', 'kanban', 'agile', 'tdd', 'rest', 'graphql', 'api', 'figma', 'photoshop',
  // Soft skills
  'comunicación', 'trabajo en equipo', 'liderazgo', 'resolución de problemas', 'creatividad', 'adaptabilidad',
  'pensamiento crítico', 'gestión del tiempo', 'organización', 'proactividad', 'empatía',
  // Áreas / roles
  'desarrollo web', 'desarrollo móvil', 'frontend', 'backend', 'fullstack', 'devops', 'data science', 'machine learning',
  'inteligencia artificial', 'ux', 'ui', 'diseño', 'qa', 'testing', 'soporte técnico', 'análisis de datos',
  'administración', 'marketing digital', 'ventas', 'atención al cliente',
  // Ofimática / herramientas
  'excel', 'word', 'powerpoint', 'office', 'google workspace', 'notion',
  // Idiomas
  'inglés', 'español', 'francés', 'portugués',
  // Educación
  'estudiante', 'recién egresado', 'experiencia', 'pasantía', 'prácticas',
];

// Normaliza un texto: minúsculas, sin acentos.
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Extrae las habilidades del diccionario que aparecen en un texto.
export function extractSkills(text: string): Set<string> {
  const normalized = normalize(text);
  const found = new Set<string>();
  for (const skill of SKILL_DICTIONARY) {
    const nSkill = normalize(skill);
    // Para habilidades de una sola palabra usamos límites de palabra; para frases, incluye.
    const pattern = nSkill.includes(' ')
      ? nSkill
      : `\\b${nSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`;
    const re = new RegExp(pattern, 'g');
    if (re.test(normalized)) {
      // Devuelve la forma original del diccionario para mostrarla bonito.
      found.add(skill);
    }
  }
  return found;
}

export interface ComparisonResult {
  matches: string[];
  pending: string[];
  strengths: string[];
  compatibility: number;
}

// Compara el perfil del usuario con la descripción de la vacante.
// Regla: compatibilidad = (coincidencias / (coincidencias + pendientes)) * 100.
// Es una estimación simple basada en conteo de términos, no una evaluación definitiva.
export function compareProfileToVacancy(profileText: string, vacancyText: string): ComparisonResult {
  const profileSkills = extractSkills(profileText);
  const vacancySkills = extractSkills(vacancyText);

  const matches: string[] = [];
  const pending: string[] = [];

  for (const skill of vacancySkills) {
    if (profileSkills.has(skill)) matches.push(skill);
    else pending.push(skill);
  }

  // Fortalezas: habilidades del perfil que no pide la vacante pero que agregan valor.
  const strengths: string[] = [];
  for (const skill of profileSkills) {
    if (!vacancySkills.has(skill)) strengths.push(skill);
  }

  const total = matches.length + pending.length;
  const compatibility = total === 0 ? 0 : Math.round((matches.length / total) * 100);

  return { matches, pending, strengths, compatibility };
}
