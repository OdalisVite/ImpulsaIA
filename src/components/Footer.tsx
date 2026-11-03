import { Rocket, Heart } from 'lucide-react';

const FOOTER_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'perfil', label: 'Perfil profesional' },
  { id: 'comparador', label: 'Comparador de vacantes' },
  { id: 'cv', label: 'Currículum' },
  { id: 'entrevistas', label: 'Simulador de entrevistas' },
  { id: 'plan', label: 'Plan de desarrollo' },
  { id: 'oportunidades', label: 'Oportunidades laborales' },
  { id: 'asistente', label: 'Asistente IA' },
  { id: 'faq', label: 'Preguntas frecuentes' },
];

export default function Footer() {
  const handleNav = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <footer className="mt-24 bg-navy-800 dark:bg-navy-900 text-cream-100">
      <div className="section-shell py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-2xl bg-lilac-600 text-white">
                <Rocket className="w-5 h-5" />
              </span>
              <span className="font-display font-extrabold text-xl tracking-tight">
                Impulza<span className="text-lilac-400">IA</span>
              </span>
            </div>
            <p className="text-cream-200/80 leading-relaxed max-w-sm">
              ImpulsaIA es una plataforma que ayuda a las personas a mejorar su perfil profesional
              y prepararse para encontrar trabajo con ayuda de la inteligencia artificial.
              Pensada para estudiantes, recién egresados y personas con experiencia.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-left text-sm text-cream-200/80 hover:text-lilac-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-cream-200/60">
          <p>© {new Date().getFullYear()} ImpulzaIA. Proyecto educativo.</p>
          <p className="flex items-center gap-1.5">
            Hecho con <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> para impulsar tu carrera.
          </p>
        </div>
      </div>
    </footer>
  );
}
