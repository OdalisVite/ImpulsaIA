import {
  ArrowRight, Wrench, FileText, MessagesSquare, Map, Briefcase, Bot, BarChart2,
} from 'lucide-react';

interface HeroProps {
  onNavigate: (id: string) => void;
}

const FEATURE_CARDS = [
  {
    icon: FileText,
    id: 'perfil',
    title: 'Perfil profesional',
    desc: 'Organiza tu formación, experiencia y metas.',
    color: 'bg-lilac-500/10 text-lilac-600 dark:text-lilac-400',
    span: 'sm:col-span-2',
  },
  {
    icon: BarChart2,
    id: 'comparador',
    title: 'Comparador de vacante',
    desc: 'Mide qué tan compatible eres con una oferta.',
    color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    span: '',
  },
  {
    icon: FileText,
    id: 'cv',
    title: 'Currículum',
    desc: 'Crea y mejora tu CV con vista previa.',
    color: 'bg-mint-500/10 text-mint-600 dark:text-mint-400',
    span: '',
  },
  {
    icon: MessagesSquare,
    id: 'entrevistas',
    title: 'Simulador de entrevistas',
    desc: 'Practica preguntas y recibe sugerencias.',
    color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    span: 'sm:col-span-2',
  },
  {
    icon: Map,
    id: 'plan',
    title: 'Plan de desarrollo',
    desc: 'Ruta de aprendizaje con metas claras.',
    color: 'bg-navy-500/10 text-navy-600 dark:text-navy-300',
    span: '',
  },
  {
    icon: Briefcase,
    id: 'oportunidades',
    title: 'Oportunidades laborales',
    desc: 'Puestos relacionados con tu perfil.',
    color: 'bg-lilac-500/10 text-lilac-600 dark:text-lilac-400',
    span: '',
  },
  {
    icon: Bot,
    id: 'asistente',
    title: 'Asistente de orientación IA',
    desc: 'Resuelve tus dudas de búsqueda de empleo.',
    color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    span: 'sm:col-span-2',
  },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="inicio" className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-lilac-400/30 dark:bg-lilac-500/15 rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 w-80 h-80 bg-sky-400/20 dark:bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-mint-400/20 dark:bg-mint-500/10 rounded-full blur-3xl" />
      </div>

      <div className="section-shell">
        {/* Encabezado */}
        <div className="max-w-3xl animate-fade-up">
          <span className="chip bg-navy-700 text-white dark:bg-lilac-600">
            <Wrench className="w-4 h-4" />
            Tu copiloto profesional con IA
          </span>
          <h1 className="mt-5 font-display font-extrabold tracking-tight text-4xl sm:text-6xl text-navy-900 dark:text-cream-50 leading-[1.05]">
            Tu próximo trabajo <br className="hidden sm:block" />
            comienza <span className="relative inline-block">
              contigo
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 9C40 3 160 3 198 9" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-navy-600 dark:text-cream-200/75 leading-relaxed max-w-2xl">
            ImpulsaIA te ayuda a construir un perfil sólido, compararlo con ofertas reales,
            practicar entrevistas y planear tu crecimiento profesional — todo con apoyo de
            inteligencia artificial.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => onNavigate('perfil')} className="btn-primary text-base px-7 py-3.5">
              Comenzar ahora
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => onNavigate('comparador')} className="btn-ghost text-base px-7 py-3.5">
              Conocer las herramientas
            </button>
          </div>
        </div>

        {/* Collage de tarjetas */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {FEATURE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onNavigate(card.id)}
                className={`card block w-full text-left p-6 cursor-pointer hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac-500/60 ${card.span}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className={`grid place-items-center w-12 h-12 rounded-2xl ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </span>
                <span className="block mt-4 font-display font-bold text-lg text-navy-900 dark:text-cream-50">
                  {card.title}
                </span>
                <span className="block mt-1.5 text-navy-600 dark:text-cream-200/70 text-sm leading-relaxed">
                  {card.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
