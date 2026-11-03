import { useState } from 'react';
import { Map, CheckCircle2, Circle, Target, Wrench, BookOpen, Trophy } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

interface PlanStep {
  id: string;
  icon: typeof Target;
  category: string;
  title: string;
  activities: { id: string; label: string }[];
}

const PLAN_STEPS: PlanStep[] = [
  {
    id: 'fundamentos',
    icon: BookOpen,
    category: 'Fundamentos',
    title: 'Afianza los fundamentos técnicos',
    activities: [
      { id: 'f1', label: 'Completar un curso de HTML, CSS y JavaScript' },
      { id: 'f2', label: 'Construir una página web personal desde cero' },
      { id: 'f3', label: 'Aprender Git y subir un proyecto a GitHub' },
    ],
  },
  {
    id: 'perfil',
    icon: Target,
    category: 'Perfil',
    title: 'Construye un perfil profesional sólido',
    activities: [
      { id: 'p1', label: 'Redactar tu perfil en la sección de ImpulsaIA' },
      { id: 'p2', label: 'Documentar al menos 2 proyectos en tu portafolio' },
      { id: 'p3', label: 'Crear o actualizar tu perfil de LinkedIn' },
    ],
  },
  {
    id: 'practica',
    icon: Wrench,
    category: 'Práctica',
    title: 'Gana experiencia práctica',
    activities: [
      { id: 'pr1', label: 'Completar 3 ejercicios de algoritmos por semana' },
      { id: 'pr2', label: 'Construir una aplicación CRUD con React y Supabase' },
      { id: 'pr3', label: 'Participar en un reto o hackathon de principiantes' },
    ],
  },
  {
    id: 'entrevista',
    icon: Trophy,
    category: 'Entrevista',
    title: 'Prepárate para el proceso de selección',
    activities: [
      { id: 'e1', label: 'Practicar 5 preguntas de entrevista en el simulador' },
      { id: 'e2', label: 'Preparar tu presentación personal en 2 minutos' },
      { id: 'e3', label: 'Simular una entrevista con un compañero o mentor' },
    ],
  },
];

export default function PlanSection() {
  const [done, setDone] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalActivities = PLAN_STEPS.reduce((n, step) => n + step.activities.length, 0);
  const progress = totalActivities > 0 ? Math.round((done.size / totalActivities) * 100) : 0;

  return (
    <section id="plan" className="py-20 sm:py-28 scroll-mt-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Plan de desarrollo"
          icon={<Map className="w-4 h-4" />}
          title="Tu ruta de desarrollo profesional"
          description="Organiza tus objetivos, habilidades por mejorar y actividades recomendadas. Marca las actividades completadas durante la sesión para seguir tu progreso."
        />

        {/* Barra de progreso */}
        <div className="mt-8 card p-6 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-navy-700 dark:text-cream-200">Progreso de la sesión</span>
              <span className="text-lilac-600 dark:text-lilac-400">{progress}%</span>
            </div>
            <div className="w-full bg-navy-100 dark:bg-navy-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-lilac-500 to-sky-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-navy-500 dark:text-cream-200/60 shrink-0">
            {done.size}/{totalActivities} completadas
          </span>
        </div>

        {/* Ruta de aprendizaje */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLAN_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="card p-6 relative">
                <span className="absolute -top-3 -right-3 grid place-items-center w-8 h-8 rounded-full bg-navy-700 dark:bg-lilac-600 text-white text-sm font-bold">
                  {i + 1}
                </span>
                <span className="grid place-items-center w-11 h-11 rounded-2xl bg-lilac-500/10 text-lilac-600 dark:text-lilac-400 mb-4">
                  <Icon className="w-5 h-5" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-500 dark:text-sky-400 mb-1">
                  {step.category}
                </p>
                <h3 className="font-display font-bold text-navy-900 dark:text-cream-50 mb-4 text-sm leading-snug">
                  {step.title}
                </h3>
                <ul className="space-y-2.5">
                  {step.activities.map((a) => {
                    const checked = done.has(a.id);
                    return (
                      <li key={a.id}>
                        <button
                          onClick={() => toggle(a.id)}
                          className="flex items-start gap-2.5 text-left w-full group"
                        >
                          {checked ? (
                            <CheckCircle2 className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-navy-300 dark:text-navy-500 shrink-0 mt-0.5 group-hover:text-lilac-400 transition-colors" />
                          )}
                          <span
                            className={`text-sm leading-snug ${
                              checked
                                ? 'line-through text-navy-400 dark:text-navy-500'
                                : 'text-navy-700 dark:text-cream-200'
                            }`}
                          >
                            {a.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
