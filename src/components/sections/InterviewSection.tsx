import { useState } from 'react';
import { MessagesSquare, Lightbulb, Briefcase } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import AINotice from '@/components/AINotice';

const ROLE_QUESTIONS: Record<string, string[]> = {
  'desarrollador-web': [
    'Cuéntame sobre un proyecto web que hayas construido. ¿Qué tecnologías usaste?',
    '¿Cómo manejas los errores y el debugging en tu código?',
    '¿Qué diferencia hay entre SQL y NoSQL? ¿Cuándo usarías cada uno?',
    'Describe una situación donde tuviste que aprender una tecnología nueva rápidamente.',
  ],
  'soporte-tecnico': [
    '¿Cómo priorizarías varios tickets de soporte que llegan al mismo tiempo?',
    'Describe un problema técnico complejo que resolviste paso a paso.',
    '¿Cómo explicas una solución técnica a un usuario sin conocimientos de informática?',
    '¿Qué haces cuando no sabes cómo resolver un problema de inmediato?',
  ],
  'analista-sistemas': [
    '¿Cómo recopilas y documentas los requisitos de un proyecto?',
    'Describe un proceso que hayas mejorado o automatizado.',
    '¿Cómo evalúas si una solución técnica es viable para un cliente?',
    '¿Cómo manejas cambios de requisitos a mitad de un proyecto?',
  ],
};

const ROLES = [
  { value: 'desarrollador-web', label: 'Desarrollador Web Junior' },
  { value: 'soporte-tecnico', label: 'Soporte Técnico' },
  { value: 'analista-sistemas', label: 'Analista de Sistemas' },
];

export default function InterviewSection() {
  const [role, setRole] = useState<string>('desarrollador-web');
  const [questions, setQuestions] = useState<string[]>(ROLE_QUESTIONS['desarrollador-web']);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, string> | null>(null);

  const selectRole = (r: string) => {
    setRole(r);
    setQuestions(ROLE_QUESTIONS[r] ?? []);
    setAnswers({});
    setFeedback(null);
  };

  const handleAnswerChange = (idx: number, value: string) => {
    setAnswers({ ...answers, [idx]: value });
  };

  // Sugerencias locales heurísticas, no IA real.
  const generateFeedback = () => {
    const fb: Record<number, string> = {};
    questions.forEach((q, idx) => {
      const a = (answers[idx] ?? '').trim();
      if (a.length < 20) {
        fb[idx] = 'Tu respuesta es muy breve. Intenta estructurarla en 3 partes: situación, acción y resultado.';
      } else if (a.length < 60) {
        fb[idx] = 'Buen inicio. Amplía con un ejemplo concreto: qué hiciste exactamente y qué resultado obtuviste.';
      } else {
        fb[idx] = 'Respuesta con buen nivel de detalle. Revisa si puedes añadir métricas o resultados medibles.';
      }
    });
    setFeedback(fb);
  };

  return (
    <section id="entrevistas" className="py-20 sm:py-28 scroll-mt-20 bg-cream-100/60 dark:bg-navy-900/40">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Simulador de entrevistas"
          icon={<MessagesSquare className="w-4 h-4" />}
          title="Practica entrevistas y mejora tus respuestas"
          description="Elige un puesto, responde las preguntas relacionadas y recibe sugerencias para responder de forma más clara y profesional."
        />

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {/* Selector de puesto */}
          <div className="card p-6 lg:col-span-1">
            <h3 className="font-display font-bold text-navy-900 dark:text-cream-50 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-lilac-500" />
              Elige un puesto
            </h3>
            <div className="space-y-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => selectRole(r.value)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium border transition-all ${
                    role === r.value
                      ? 'bg-navy-700 dark:bg-lilac-600 text-white border-navy-700 dark:border-lilac-600'
                      : 'bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-600 text-navy-700 dark:text-cream-200 hover:border-lilac-400'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preguntas y respuestas */}
          <div className="card p-6 lg:col-span-2">
            <div className="space-y-5">
              {questions.map((q, idx) => (
                <div key={idx} className="border-b border-navy-100 dark:border-navy-700 pb-4 last:border-0">
                  <p className="font-medium text-navy-800 dark:text-cream-100 mb-2">
                    <span className="text-lilac-500 font-bold">{idx + 1}.</span> {q}
                  </p>
                  <textarea
                    value={answers[idx] ?? ''}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    placeholder="Escribe aquí tu respuesta…"
                    rows={3}
                    className="input-field resize-none text-sm"
                  />
                  {feedback && feedback[idx] && (
                    <p className="mt-2 text-sm text-sky-600 dark:text-sky-400 flex items-start gap-1.5 animate-fade-up">
                      <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
                      {feedback[idx]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button onClick={generateFeedback} className="btn-primary mt-5">
              <Lightbulb className="w-4 h-4" />
              Solicitar recomendaciones
            </button>
          </div>
        </div>

        <div className="mt-6">
          <AINotice message="Las recomendaciones de entrevista con IA real se conectarán en una próxima etapa. Hoy se aplican heurísticas locales como demostración." />
        </div>
      </div>
    </section>
  );
}
