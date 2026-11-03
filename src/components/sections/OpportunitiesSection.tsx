import { Briefcase, ExternalLink, Wrench, Info } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

interface JobCard {
  title: string;
  description: string;
  skills: string[];
  link?: string;
  demo?: boolean;
}

// Tarjetas de demostración. No son vacantes reales ni enlaces verificados.
const DEMO_JOBS: JobCard[] = [
  {
    title: 'Desarrollador Web Junior',
    description:
      'Apoyo en el desarrollo frontend de aplicaciones web. Ideal para personas con bases de HTML, CSS y JavaScript que quieran crecer en un equipo.',
    skills: ['JavaScript', 'HTML', 'CSS', 'Git'],
    demo: true,
  },
  {
    title: 'Soporte Técnico',
    description:
      'Atención de tickets, diagnóstico de problemas básicos de hardware y software, y asistencia a usuarios finales.',
    skills: ['Soporte técnico', 'Comunicación', 'Windows', 'Excel'],
    demo: true,
  },
  {
    title: 'Analista de Sistemas Junior',
    description:
      'Recopilación de requisitos, documentación de procesos y apoyo en la implementación de soluciones para clientes internos.',
    skills: ['Análisis de datos', 'Comunicación', 'SQL', 'Organización'],
    demo: true,
  },
  {
    title: 'Diseñador UI Junior',
    description:
      'Creación de prototipos visuales y apoyo al equipo de diseño en la elaboración de interfaces para productos digitales.',
    skills: ['Figma', 'Diseño', 'UX', 'Creatividad'],
    demo: true,
  },
];

export default function OpportunitiesSection() {
  return (
    <section id="oportunidades" className="py-20 sm:py-28 scroll-mt-20 bg-cream-100/60 dark:bg-navy-900/40">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Oportunidades laborales"
          icon={<Briefcase className="w-4 h-4" />}
          title="Explora puestos relacionados con tu perfil"
          description="Estas tarjetas muestran puestos que podrían relacionarse con tu perfil profesional. La sección está preparada para conectarse próximamente con una API de empleo real."
        />

        <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-amber-50 dark:bg-amber-400/10 border border-amber-300/50 dark:border-amber-400/30 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            Las vacantes mostradas abajo son <strong>demostraciones</strong> y no representan ofertas
            reales. Cuando se conecte la API de empleo, aquí aparecerán puestos reales con enlaces válidos.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {DEMO_JOBS.map((job) => (
            <div key={job.title} className="card p-6 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
                  <Briefcase className="w-5 h-5" />
                </span>
                {job.demo && (
                  <span className="chip bg-amber-400/20 text-amber-600 dark:text-amber-400 text-xs">
                    Demostración
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display font-bold text-lg text-navy-900 dark:text-cream-50">
                {job.title}
              </h3>
              <p className="mt-1.5 text-sm text-navy-600 dark:text-cream-200/70 leading-relaxed">
                {job.description}
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-400 dark:text-navy-500 flex items-center gap-1.5 mb-2">
                  <Wrench className="w-3.5 h-3.5" />
                  Habilidades solicitadas
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span key={s} className="chip bg-navy-100 dark:bg-navy-700 text-navy-700 dark:text-cream-200 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {job.link ? (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-5 text-sm w-full"
                >
                  Ver oferta
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button disabled className="btn-ghost mt-5 text-sm w-full opacity-50 cursor-not-allowed">
                  Enlace disponible pronto
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
