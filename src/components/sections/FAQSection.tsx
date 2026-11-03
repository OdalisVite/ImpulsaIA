import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const FAQS = [
  {
    q: '¿Qué es ImpulzaIA?',
    a: 'ImpulsaIA es una plataforma que ayuda a las personas a mejorar su perfil profesional y prepararse para encontrar trabajo con ayuda de la inteligencia artificial. Está pensada para estudiantes, recién egresados y personas con experiencia.',
  },
  {
    q: '¿Necesito crear una cuenta?',
    a: 'Por ahora no. Los datos que escribas se usan temporalmente durante la sesión y no se guardan de forma permanente. Si recargas la página, la información se perderá.',
  },
  {
    q: '¿Las funciones de IA ya funcionan?',
    a: 'El comparador de perfil con vacantes ya funciona sin necesidad de IA. Las demás funciones que requieren IA (mejorar perfiles, adaptar currículums, simular entrevistas, crear planes y el asistente) están preparadas visualmente y se conectarán a una IA real en una próxima etapa.',
  },
  {
    q: '¿Mis datos se guardan en algún lugar?',
    a: 'No. En esta primera versión no hay base de datos ni registro de usuarios. Toda la información que introduzcas vive solo en tu navegador durante la sesión.',
  },
  {
    q: '¿Las ofertas laborales son reales?',
    a: 'No. Las vacantes que ves son demostraciones para mostrar cómo funcionará la sección. Cuando se conecte una API de empleo real, aparecerán puestos reales con enlaces válidos.',
  },
  {
    q: '¿Cómo se manejarán las claves de las APIs?',
    a: 'Cuando conectemos las APIs, las claves secretas se gestionarán de forma segura en el servidor (Edge Functions), nunca en el código visible del navegador. Te explicaremos la configuración necesaria en ese momento.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 scroll-mt-20 bg-cream-100/60 dark:bg-navy-900/40">
      <div className="section-shell max-w-3xl">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          icon={<HelpCircle className="w-4 h-4" />}
          title="Dudas comunes sobre ImpulzaIA"
          align="center"
        />

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display font-bold text-navy-900 dark:text-cream-50">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-lilac-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 -mt-1 text-navy-600 dark:text-cream-200/70 leading-relaxed animate-fade-up">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
