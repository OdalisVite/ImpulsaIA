import { useState } from 'react';
import { FileText, Wand2, Download, Info } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import AINotice from '@/components/AINotice';
import type { ProfileData } from '@/components/sections/ProfileSection';

const STAGE_LABELS: Record<string, string> = {
  'estudiante': 'Estudiante',
  'recien-egresado': 'Recién egresado/a',
  'experiencia': 'Profesional con experiencia',
};

interface CVSectionProps {
  profile: ProfileData;
}

function improveText(text: string): string {
  return text
    .trim()
    .replace(/[ \t]+/g, ' ')
    .replace(/\bquiero trabajar como\b/gi, 'Me interesa desarrollarme como')
    .replace(/\bnecesito\b/gi, 'busco')
    .replace(/\btengo experiencia en\b/gi, 'Cuento con experiencia en')
    .replace(/\brealicé\b/gi, 'Desarrollé')
    .replace(/\bayudé a\b/gi, 'Contribuí a');
}

function improveProfile(profile: ProfileData): ProfileData {
  return {
    ...profile,
    education: improveText(profile.education),
    experience: improveText(profile.experience),
    skills: improveText(profile.skills),
    projects: improveText(profile.projects),
    goals: improveText(profile.goals),
  };
}

export default function CVSection({ profile }: CVSectionProps) {
  const [targetVacancy, setTargetVacancy] = useState('');
  const [optimizedProfile, setOptimizedProfile] = useState<ProfileData | null>(null);

  const optimized = optimizedProfile !== null;
  const displayProfile = optimizedProfile ?? profile;

  const handleOptimize = () => {
    const improvedProfile = improveProfile(profile);
    const changed = (Object.keys(improvedProfile) as (keyof ProfileData)[]).some(
      (key) => improvedProfile[key] !== profile[key],
    );
    setOptimizedProfile(changed ? improvedProfile : null);
  }; 
  const handleDownload = () => {
    // Descarga el CV como archivo de texto plano (placeholder de PDF).
    const lines = [
      'IMPULZAIA — CURRÍCULUM',
      '========================',
      '',
      `Etapa: ${STAGE_LABELS[displayProfile.stage] ?? '—'}`,
      '',
      'FORMACIÓN ACADÉMICA',
      displayProfile.education || '—',
      '',
      'EXPERIENCIA LABORAL',
      displayProfile.experience || '—',
      '',
      'HABILIDADES',
      displayProfile.skills || '—',
      '',
      'PROYECTOS',
      displayProfile.projects || '—',
      '',
      'OBJETIVOS LABORALES',
      displayProfile.goals || '—',
    ];
    if (optimized && targetVacancy.trim()) {
      lines.push('', 'ADAPTADO A LA VACANTE', targetVacancy.trim());
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curriculum-impulsaia.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const isEmpty =
    !profile.education && !profile.experience && !profile.skills && !profile.projects && !profile.goals;

  return (
    <section id="cv" className="py-20 sm:py-28 scroll-mt-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Currículum"
          icon={<FileText className="w-4 h-4" />}
          title="Creador y mejorador de currículum"
          description="Tu perfil se convierte en un currículum con vista previa profesional. Podrás mejorar la redacción, adaptar el contenido a una vacante y descargarlo."
        />

        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          {/* Controles */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6">
              <h3 className="font-display font-bold text-navy-900 dark:text-cream-50 mb-3">
                Adaptar a una vacante
              </h3>
              <textarea
                value={targetVacancy}
                onChange={(e) => setTargetVacancy(e.target.value)}
                placeholder="Pega aquí la descripción de la vacante para adaptar tu CV…"
                rows={5}
                className="input-field resize-none text-sm"
              />
              <button onClick={handleOptimize} className="btn-primary mt-3" disabled={!targetVacancy.trim()}>
                <Wand2 className="w-4 h-4" />
                Adaptar contenido
              </button>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-bold text-navy-900 dark:text-cream-50 mb-3">
                Descargar
              </h3>
              <button onClick={handleDownload} className="btn-ghost w-full" disabled={isEmpty}>
                <Download className="w-4 h-4" />
                Descargar currículum
              </button>
              <p className="text-xs text-navy-500 dark:text-cream-200/60 mt-2 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Se descarga como archivo de texto. La exportación a PDF se añadirá en una próxima etapa.
              </p>
            </div>

            <AINotice message="La adaptación usa reglas locales de redacción. La conexión a una IA real llegará en una próxima etapa." />
          </div>

          {/* Vista previa */}
          <div className="lg:col-span-3">
            <div className="card p-8 bg-white dark:bg-cream-50 text-navy-900 min-h-[28rem]">
              <CVPreview profile={displayProfile} optimized={optimized} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CVPreview({ profile, optimized }: { profile: ProfileData; optimized: boolean }) {
  if (
    !profile.education &&
    !profile.experience &&
    !profile.skills &&
    !profile.projects &&
    !profile.goals
  ) {
    return (
      <div className="h-full grid place-items-center text-center text-navy-400 dark:text-navy-500">
        <div>
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Completa tu perfil profesional para ver aquí la vista previa del currículum.</p>
        </div>
      </div>
    );
  }

  return (
    <article className="space-y-5">
      <header className="border-b-2 border-navy-800 dark:border-navy-700 pb-4">
        <h3 className="font-display font-extrabold text-2xl">Currículum Vitae</h3>
        <p className="text-sm text-navy-600 dark:text-navy-600 mt-1">
          {STAGE_LABELS[profile.stage] ?? 'Perfil profesional'}
        </p>
        {optimized && (
          <span className="chip bg-lilac-500/15 text-lilac-600 mt-2 text-xs">
            <Wand2 className="w-3.5 h-3.5" />
            Adaptado a vacante
          </span>
        )}
      </header>

      {profile.education && (
        <CVBlock title="Formación académica" body={profile.education} />
      )}
      {profile.experience && (
        <CVBlock title="Experiencia laboral" body={profile.experience} />
      )}
      {profile.skills && <CVBlock title="Habilidades" body={profile.skills} />}
      {profile.projects && <CVBlock title="Proyectos" body={profile.projects} />}
      {profile.goals && <CVBlock title="Objetivos laborales" body={profile.goals} />}
    </article>
  );
}

function CVBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h4 className="font-display font-bold text-sm uppercase tracking-wide text-lilac-600 dark:text-lilac-500 mb-1.5">
        {title}
      </h4>
      <p className="text-navy-800 dark:text-navy-800 text-sm leading-relaxed whitespace-pre-wrap">{body}</p>
    </div>
  );
}
