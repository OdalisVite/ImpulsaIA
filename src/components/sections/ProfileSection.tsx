import { useState } from 'react';
import { UserCircle2, GraduationCap, Briefcase, Wrench, FolderGit2, Target, Sparkles, Wand2 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import AINotice from '@/components/AINotice';

export interface ProfileData {
  stage: string;
  education: string;
  experience: string;
  skills: string;
  projects: string;
  goals: string;
}

interface ProfileSectionProps {
  profile: ProfileData;
  setProfile: (data: ProfileData) => void;
}

const STAGES = [
  { value: 'estudiante', label: 'Estudiante' },
  { value: 'recien-egresado', label: 'Recién egresado/a' },
  { value: 'experiencia', label: 'Con experiencia' },
];

export default function ProfileSection({ profile, setProfile }: ProfileSectionProps) {
  const [improved, setImproved] = useState(false);

  const update = (key: keyof ProfileData, value: string) =>
    setProfile({ ...profile, [key]: value });

  const handleImprove = () => {
    // Sustitución local de marcadores básicos de redacción. No es IA real.
    const cleaned = profile.goals
      .replace(/\bquiero\b/gi, 'aspiro a')
      .replace(/\bnecesito\b/gi, 'busco')
      .replace(/\btrabajar\b/gi, 'desarrollarme profesionalmente');
    setProfile({ ...profile, goals: cleaned });
    setImproved(true);
  };

  return (
    <section id="perfil" className="py-20 sm:py-28 scroll-mt-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Perfil profesional"
          icon={<UserCircle2 className="w-4 h-4" />}
          title="Crea y mejora tu perfil profesional"
          description="Organiza tu formación, experiencia, habilidades, proyectos y objetivos. Esta información se usará en las demás herramientas de ImpulsaIA."
        />

        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          {/* Formulario */}
          <div className="card p-6 sm:p-8 lg:col-span-3">
            <div className="space-y-5">
              {/* Etapa */}
              <div>
                <label className="block text-sm font-semibold text-navy-700 dark:text-cream-200 mb-2">
                  ¿En qué etapa estás?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {STAGES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => update('stage', s.value)}
                      className={`px-3 py-2.5 rounded-2xl text-sm font-medium border transition-all ${
                        profile.stage === s.value
                          ? 'bg-navy-700 dark:bg-lilac-600 text-white border-navy-700 dark:border-lilac-600'
                          : 'bg-white dark:bg-navy-800 border-navy-200 dark:border-navy-600 text-navy-700 dark:text-cream-200 hover:border-lilac-400'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Formación */}
              <Field
                icon={<GraduationCap className="w-4 h-4" />}
                label="Formación académica"
                placeholder="Ej. Técnico en Programación, Universidad X (2020–2023)"
                value={profile.education}
                onChange={(v) => update('education', v)}
              />

              {/* Experiencia */}
              <Field
                icon={<Briefcase className="w-4 h-4" />}
                label="Experiencia laboral"
                placeholder="Ej. Pasantía como soporte técnico, 6 meses"
                value={profile.experience}
                onChange={(v) => update('experience', v)}
                textarea
              />

              {/* Habilidades */}
              <Field
                icon={<Wrench className="w-4 h-4" />}
                label="Habilidades"
                placeholder="Ej. JavaScript, comunicación, Excel, trabajo en equipo"
                value={profile.skills}
                onChange={(v) => update('skills', v)}
              />

              {/* Proyectos */}
              <Field
                icon={<FolderGit2 className="w-4 h-4" />}
                label="Proyectos"
                placeholder="Ej. App de tareas con React y Supabase"
                value={profile.projects}
                onChange={(v) => update('projects', v)}
                textarea
              />

              {/* Objetivos */}
              <Field
                icon={<Target className="w-4 h-4" />}
                label="Objetivos laborales"
                placeholder="Ej. Quiero trabajar como desarrollador web junior"
                value={profile.goals}
                onChange={(v) => update('goals', v)}
                textarea
              />

              <button onClick={handleImprove} className="btn-primary w-full sm:w-auto">
                <Wand2 className="w-4 h-4" />
                Mejorar descripción profesional
              </button>
              {improved && (
                <p className="text-sm text-mint-600 dark:text-mint-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Se aplicaron ajustes de redacción básicos (demostración local).
                </p>
              )}
            </div>
          </div>

          {/* Resumen lateral */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6">
              <h3 className="font-display font-bold text-navy-900 dark:text-cream-50 mb-3">
                Resumen de tu perfil
              </h3>
              <p className="text-sm text-navy-600 dark:text-cream-200/70 mb-4">
                Lo que escribas aquí se reutiliza automáticamente en el comparador, el currículum y otros módulos.
              </p>
              <ProfileSummary profile={profile} />
            </div>
            <AINotice message="La mejora de descripción con IA real se conectará en una próxima etapa. Hoy se aplican ajustes de redacción locales como demostración." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon, label, placeholder, value, onChange, textarea,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-navy-700 dark:text-cream-200 mb-2">
        <span className="text-lilac-500">{icon}</span>
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="input-field resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-field"
        />
      )}
    </div>
  );
}

function ProfileSummary({ profile }: { profile: ProfileData }) {
  const rows: { label: string; value: string }[] = [
    { label: 'Etapa', value: STAGES.find((s) => s.value === profile.stage)?.label ?? '—' },
    { label: 'Formación', value: profile.education || '—' },
    { label: 'Experiencia', value: profile.experience || '—' },
    { label: 'Habilidades', value: profile.skills || '—' },
    { label: 'Proyectos', value: profile.projects || '—' },
    { label: 'Objetivos', value: profile.goals || '—' },
  ];
  return (
    <dl className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between gap-3 text-sm border-b border-navy-100 dark:border-navy-700 pb-2.5">
          <dt className="font-medium text-navy-500 dark:text-cream-200/60 shrink-0">{r.label}</dt>
          <dd className="text-navy-800 dark:text-cream-100 text-right">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
